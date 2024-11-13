import * as THREE from "three";
import load_mujoco, { MujocoModule } from '../wasm/mujoco_wasm';
import { mjtGeom } from "../wasm/mujoco_model_enums";
import { MujocoContainer } from "./MujocoContainer";
import { UpdateProps } from "./UpdateProps";
import { createMirrotCheckerboard } from "./threeUtils";

// Virtual Filesystem used by the WASM container.
const VIRTUAL_FILE_SYSTEM = "/working";

// The folder containing all examples.
const EXAMPLES_FOLDER = "./examples/scenes/";

// The name of ThreeJS group which contains the whole MuJoCo scene.
const ROOT_OBJECT_NAME = "MuJoCo Root";

/**
 * Add a body ID to the Mesh object.
 */
export class BodyMesh extends THREE.Object3D {
    bodyID?: number;
}

/**
 * Add a body ID to the Group object and a boolean to indicate if the mesh has
 * been customized.
 */
export class Body extends THREE.Object3D {
    bodyID?: number;
    has_custom_mesh?: boolean;
}

/**
 * Access the vector at index, swizzle for three.js, and apply to the target
 * THREE.Vector3
 */
const getPosition = (
    buffer: Float32Array | Float64Array,
    index: number,
    target: THREE.Vector3,
    swizzle: boolean = true
) => {
    if (swizzle) {
        return target.set(
            buffer[index * 3 + 0],
            buffer[index * 3 + 2],
            -buffer[index * 3 + 1]
        );
    } else {
        return target.set(
            buffer[index * 3 + 0],
            buffer[index * 3 + 1],
            buffer[index * 3 + 2]
        );
    }
};

/**
 * Access the quaternion at index, swizzle for three.js, and apply to the
 * target THREE.Quaternion.
 */
const getQuaternion = (
    buffer: Float32Array | Float64Array,
    index: number,
    target: THREE.Quaternion,
    swizzle: boolean = true
) => {
    if (swizzle) {
        return target.set(
            -buffer[index * 4 + 1],
            -buffer[index * 4 + 3],
            buffer[index * 4 + 2],
            -buffer[index * 4 + 0]
        );
    } else {
        return target.set(
            buffer[index * 4 + 0],
            buffer[index * 4 + 1],
            buffer[index * 4 + 2],
            buffer[index * 4 + 3]
        );
    }
};

/**
 * Copy all necessary files to the MuJoCo WASM module's virtual file system.
 * @param mujocoModule The MuJoCo WASM module.
 */
const copyMujocoModuleAssets = async (mujocoModule: MujocoModule) => {
    const allFiles = [
        "22_humanoids.xml",
        "adhesion.xml",
        "agility_cassie/assets/achilles-rod.obj",
        "agility_cassie/assets/cassie-texture.png",
        "agility_cassie/assets/foot-crank.obj",
        "agility_cassie/assets/foot.obj",
        "agility_cassie/assets/heel-spring.obj",
        "agility_cassie/assets/hip-pitch.obj",
        "agility_cassie/assets/hip-roll.obj",
        "agility_cassie/assets/hip-yaw.obj",
        "agility_cassie/assets/knee-spring.obj",
        "agility_cassie/assets/knee.obj",
        "agility_cassie/assets/pelvis.obj",
        "agility_cassie/assets/plantar-rod.obj",
        "agility_cassie/assets/shin.obj",
        "agility_cassie/assets/tarsus.obj",
        "agility_cassie/cassie.xml",
        "agility_cassie/scene.xml",
        "arm26.xml",
        "balloons.xml",
        "empty.xml",
        "flag.xml",
        "hammock.xml",
        "humanoid.xml",
        "humanoid_body.xml",
        "mug.obj",
        "mug.png",
        "mug.xml",
        "scene.xml",
        "shadow_hand/assets/f_distal_pst.obj",
        "shadow_hand/assets/f_knuckle.obj",
        "shadow_hand/assets/f_middle.obj",
        "shadow_hand/assets/f_proximal.obj",
        "shadow_hand/assets/forearm_0.obj",
        "shadow_hand/assets/forearm_1.obj",
        "shadow_hand/assets/forearm_collision.obj",
        "shadow_hand/assets/lf_metacarpal.obj",
        "shadow_hand/assets/mounting_plate.obj",
        "shadow_hand/assets/palm.obj",
        "shadow_hand/assets/th_distal_pst.obj",
        "shadow_hand/assets/th_middle.obj",
        "shadow_hand/assets/th_proximal.obj",
        "shadow_hand/assets/wrist.obj",
        "shadow_hand/left_hand.xml",
        "shadow_hand/right_hand.xml",
        "shadow_hand/scene_left.xml",
        "shadow_hand/scene_right.xml",
        "simple.xml",
        "slider_crank.xml",
        "model_with_tendon.xml",
    ];

    const requests = allFiles.map((url) => fetch(`${EXAMPLES_FOLDER}${url}`));
    const responses = await Promise.all(requests);
    for (let i = 0; i < responses.length; i++) {
        const split = allFiles[i].split("/");
        let working = `${VIRTUAL_FILE_SYSTEM}/`;
        // Create the directory structure if it doesn't exist.
        for (let f = 0; f < split.length - 1; f++) {
            working += split[f];
            if (!mujocoModule.FS.analyzePath(working).exists) {
                mujocoModule.FS.mkdir(working);
            }
            working += "/";
        }
        if (allFiles[i].endsWith(".png") || allFiles[i].endsWith(".stl") || allFiles[i].endsWith(".skn")) {
            const data = new Uint8Array(await responses[i].arrayBuffer());
            mujocoModule.FS.writeFile(`${VIRTUAL_FILE_SYSTEM}/` + allFiles[i], data);
        } else {
            const text = await responses[i].text()
            mujocoModule.FS.writeFile(`${VIRTUAL_FILE_SYSTEM}/` + allFiles[i], text);
        }
    }
}

/**
 * Initialize the MuJoCo WASM module file system and copy over all necessary files.
 * @param mujocoModule The MuJoCo WASM module to initialize.
 */
export const loadMujocoModule = async (): Promise<MujocoContainer> => {
    try {
        // Load the WASM module.
        const mujocoModule = await load_mujoco();
        if (mujocoModule) {
            console.log("MuJoCo WASM module loaded successfully.");
        } else {
            throw new Error("MuJoCo WASM module returned an invalid value.");
        }

        // Initialize the file system.
        mujocoModule.FS.mkdir(VIRTUAL_FILE_SYSTEM);
        mujocoModule.FS.mount(mujocoModule.MEMFS, { root: "." }, VIRTUAL_FILE_SYSTEM);

        // Copy all necessary assets.
        await copyMujocoModuleAssets(mujocoModule);
        console.log("Successfully copied over all necessary assets.");

        // Create the default simulation.
        const model = new mujocoModule.Model(`${VIRTUAL_FILE_SYSTEM}/empty.xml`);
        const state = new mujocoModule.State(model);
        const simulation = new mujocoModule.Simulation(model, state);
        console.log("Successfully created the default simulation.");

        return new MujocoContainer(mujocoModule, simulation);

    } catch (error: unknown) {
        console.error(error);
        throw new Error(`MuJoCo WASM module failed to initialize: ${error}`);
    }
};

/**
 * Load a MuJoCo scene from the given URL.
 * @param sceneUrl The URL of the scene to load.
 * @throws {Error} If the scene fails to load.
 */
const loadMujocoScene = async (mujocoContainer: MujocoContainer, sceneURl: string): Promise<void> => {

    try {
        const mujocoModule = mujocoContainer.getMujocoModule();
        const simulation = mujocoContainer.getSimulation();

        // Free the old simulation.
        if (simulation != null) {
            simulation.free();
        }

        const newModel = new mujocoModule.Model(`${VIRTUAL_FILE_SYSTEM}/${sceneURl}`);
        const newState = new mujocoModule.State(newModel);
        const newSimulation = new mujocoModule.Simulation(newModel, newState);

        mujocoContainer.setSimulation(newSimulation);
        console.log(`Successfully loaded the scene: ${sceneURl}`);

    } catch (error: unknown) {
        console.error(error);
        throw new Error(`MuJoCo WASM module failed to initialize: ${error}`);
    }

}

/**
 * Read the MuJoCo model and add geometries to the given three.js scene.
 * Return pointers to all newly created geometries.
 * @param mujocoModule The MuJoCo wasm module.
 * @param simulation The MuJoCo simulation.
 * @param scene The three.js scene.
 * @returns Pointers to newly created geometries.
 */
export const loadScene = (
    mujocoContainer: MujocoContainer,
    sceneUrl: string,
    scene: THREE.Scene
): UpdateProps => {

    // Load the Mujoco scene inside the MuJoCo WASM module.
    loadMujocoScene(mujocoContainer, sceneUrl);

    // Remove the existing root object.
    const object = scene.getObjectByName(ROOT_OBJECT_NAME);
    if (object) {
        scene.remove(object);
    }

    // Create a new root object.
    const mujocoRoot = new THREE.Group();
    mujocoRoot.name = ROOT_OBJECT_NAME;
    scene.add(mujocoRoot);

    const bodies: { [key: number]: Body } = {};
    const meshes: { [key: number]: THREE.BufferGeometry } = {};
    const lights: THREE.Light[] = [];

    // Default material definition.
    let material = new THREE.MeshPhysicalMaterial();
    material.color = new THREE.Color(1, 1, 1);

    const simulation = mujocoContainer.getSimulation()
    const model = simulation.model();

    // Decode the null-terminated string names.
    const textDecoder = new TextDecoder("utf-8");
    const fullString = textDecoder.decode(model.names);
    const names = fullString.split(textDecoder.decode(new ArrayBuffer(1)));

    // Loop through the MuJoCo geoms and recreate them in three.js.
    for (let g = 0; g < model.ngeom; g++) {
        // Only visualize geom groups up to 2 (same default behavior as simulate).
        if (!(model.geom_group[g] < 3)) {
            continue;
        }

        // Get the body ID and type of the geom.
        const b = model.geom_bodyid[g];
        const type = model.geom_type[g];
        const size = [
            model.geom_size[g * 3 + 0],
            model.geom_size[g * 3 + 1],
            model.geom_size[g * 3 + 2]
        ];

        // Create the body if it doesn't exist.
        if (!(b in bodies)) {
            bodies[b] = new Body();
            bodies[b].name = names[model.name_bodyadr[b]];
            bodies[b].bodyID = b;
            bodies[b].has_custom_mesh = false;
        }

        // Set the default geometry. In MuJoCo, this is a sphere.
        let geometry: THREE.BufferGeometry = new THREE.SphereGeometry(size[0] * 0.5);

        if (type === mjtGeom.mjGEOM_PLANE) {
            // Special handling for plane later.
        } else if (type === mjtGeom.mjGEOM_HFIELD) {
            // TODO: Implement this.
        } else if (type === mjtGeom.mjGEOM_SPHERE) {
            geometry = new THREE.SphereGeometry(size[0]);
        } else if (type === mjtGeom.mjGEOM_CAPSULE) {
            geometry = new THREE.CapsuleGeometry(size[0], size[1] * 2.0, 20, 20);
        } else if (type === mjtGeom.mjGEOM_ELLIPSOID) {
            geometry = new THREE.SphereGeometry(1); // Stretch this below
        } else if (type === mjtGeom.mjGEOM_CYLINDER) {
            geometry = new THREE.CylinderGeometry(size[0], size[0], size[1] * 2.0);
        } else if (type === mjtGeom.mjGEOM_BOX) {
            geometry = new THREE.BoxGeometry(size[0] * 2.0, size[2] * 2.0, size[1] * 2.0);
        } else if (type === mjtGeom.mjGEOM_MESH) {
            const meshID = model.geom_dataid[g];

            if (!(meshID in meshes)) {
                geometry = new THREE.BufferGeometry(); // TODO: Populate the Buffer Geometry with Generic Mesh Data

                const vertex_buffer = model.mesh_vert.subarray(
                    model.mesh_vertadr[meshID] * 3,
                    (model.mesh_vertadr[meshID] + model.mesh_vertnum[meshID]) * 3
                );
                for (let v = 0; v < vertex_buffer.length; v += 3) {
                    //vertex_buffer[v + 0] =  vertex_buffer[v + 0];
                    const temp = vertex_buffer[v + 1];
                    vertex_buffer[v + 1] = vertex_buffer[v + 2];
                    vertex_buffer[v + 2] = -temp;
                }

                const normal_buffer = model.mesh_normal.subarray(
                    model.mesh_vertadr[meshID] * 3,
                    (model.mesh_vertadr[meshID] + model.mesh_vertnum[meshID]) * 3
                );
                for (let v = 0; v < normal_buffer.length; v += 3) {
                    //normal_buffer[v + 0] =  normal_buffer[v + 0];
                    const temp = normal_buffer[v + 1];
                    normal_buffer[v + 1] = normal_buffer[v + 2];
                    normal_buffer[v + 2] = -temp;
                }

                const uv_buffer = model.mesh_texcoord.subarray(
                    model.mesh_texcoordadr[meshID] * 2,
                    (model.mesh_texcoordadr[meshID] + model.mesh_vertnum[meshID]) * 2
                );
                const triangle_buffer = model.mesh_face.subarray(
                    model.mesh_faceadr[meshID] * 3,
                    (model.mesh_faceadr[meshID] + model.mesh_facenum[meshID]) * 3
                );
                geometry.setAttribute("position", new THREE.BufferAttribute(vertex_buffer, 3));
                geometry.setAttribute("normal", new THREE.BufferAttribute(normal_buffer, 3));
                geometry.setAttribute("uv", new THREE.BufferAttribute(uv_buffer, 2));
                geometry.setIndex(Array.from(triangle_buffer));
                meshes[meshID] = geometry;
            } else {
                geometry = meshes[meshID];
            }

            bodies[b].has_custom_mesh = true;
        }
        // Done with geometry creation.

        // Set the Material Properties of incoming bodies
        let texture = undefined;
        let color = [
            model.geom_rgba[g * 4 + 0],
            model.geom_rgba[g * 4 + 1],
            model.geom_rgba[g * 4 + 2],
            model.geom_rgba[g * 4 + 3]
        ];
        if (model.geom_matid[g] != -1) {
            const matId = model.geom_matid[g];
            color = [
                model.mat_rgba[matId * 4 + 0],
                model.mat_rgba[matId * 4 + 1],
                model.mat_rgba[matId * 4 + 2],
                model.mat_rgba[matId * 4 + 3]
            ];

            // Construct Texture from model.tex_data
            texture = undefined;
            const texId = model.mat_texid[matId];
            if (texId != -1) {
                const width = model.tex_width[texId];
                const height = model.tex_height[texId];
                const offset = model.tex_adr[texId];
                const rgbArray = model.tex_data;
                const rgbaArray = new Uint8Array(width * height * 4);

                for (let p = 0; p < width * height; p++) {
                    rgbaArray[p * 4 + 0] = rgbArray[offset + (p * 3 + 0)];
                    rgbaArray[p * 4 + 1] = rgbArray[offset + (p * 3 + 1)];
                    rgbaArray[p * 4 + 2] = rgbArray[offset + (p * 3 + 2)];
                    rgbaArray[p * 4 + 3] = 1.0;
                }
                texture = new THREE.DataTexture(
                    rgbaArray,
                    width,
                    height,
                    THREE.RGBAFormat,
                    THREE.UnsignedByteType
                );
                if (texId == 2) {
                    texture.repeat = new THREE.Vector2(50, 50);
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                } else {
                    texture.repeat = new THREE.Vector2(1, 1);
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                }

                texture.needsUpdate = true;
            }
        }

        if (
            material.color.r != color[0] ||
            material.color.g != color[1] ||
            material.color.b != color[2] ||
            material.opacity != color[3] ||
            material.map != texture
        ) {
            material = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color(color[0], color[1], color[2]),
                transparent: color[3] < 1.0,
                opacity: color[3],
                specularIntensity:
                    model.geom_matid[g] != -1
                        ? model.mat_specular[model.geom_matid[g]] * 0.5
                        : undefined,
                reflectivity:
                    model.geom_matid[g] != -1
                        ? model.mat_reflectance[model.geom_matid[g]]
                        : undefined,
                roughness:
                    model.geom_matid[g] != -1
                        ? 1.0 - model.mat_shininess[model.geom_matid[g]]
                        : undefined,
                metalness: model.geom_matid[g] != -1 ? 0.1 : undefined,
                map: texture
            });
        }

        let mesh = new BodyMesh();
        if (type == 0) {
            const groundMirror = createMirrotCheckerboard(texture);
            groundMirror.rotateX(-Math.PI / 2);
            mesh = groundMirror;
        } else {
            mesh = new THREE.Mesh(geometry, material);
        }

        mesh.castShadow = g == 0 ? false : true;
        mesh.receiveShadow = type != 7;
        mesh.bodyID = b;
        bodies[b].add(mesh);
        getPosition(model.geom_pos, g, mesh.position);
        if (type != 0) {
            getQuaternion(model.geom_quat, g, mesh.quaternion);
        }
        if (type == 4) {
            mesh.scale.set(size[0], size[2], size[1]);
        } // Stretch the Ellipsoid
    }

    // Parse tendons

    // An InstancedMesh allows the same geometry to be reused multiple times
    // with minimal performance cost.

    const tendonMat = new THREE.MeshPhongMaterial();
    tendonMat.color = new THREE.Color(0.8, 0.3, 0.3);

    const cylinders = new THREE.InstancedMesh(
        new THREE.CylinderGeometry(1, 1, 1),
        tendonMat,
        1023 // The number of cylinders.
    );
    cylinders.receiveShadow = true;
    cylinders.castShadow = true;
    mujocoRoot.add(cylinders);

    const spheres = new THREE.InstancedMesh(
        new THREE.SphereGeometry(1, 10, 10),
        tendonMat,
        1023 // The number of spheres.
    );
    spheres.receiveShadow = true;
    spheres.castShadow = true;
    mujocoRoot.add(spheres);

    // Parse lights.
    for (let l = 0; l < model.nlight; l++) {
        let light: THREE.SpotLight | THREE.DirectionalLight;
        if (model.light_directional[l]) {
            light = new THREE.DirectionalLight();
        } else {
            light = new THREE.SpotLight();
            light.decay = model.light_attenuation[l] * 100;
            light.penumbra = 0.5;
        }
        light.castShadow = true; // default false
        light.shadow.mapSize.width = 1024; // default
        light.shadow.mapSize.height = 1024; // default
        light.shadow.camera.near = 1; // default
        light.shadow.camera.far = 10; // default
        //bodies[model.light_bodyid()].add(light);
        if (bodies[0]) {
            bodies[0].add(light);
        } else {
            mujocoRoot.add(light);
        }
        lights.push(light);
    }
    if (model.nlight == 0) {
        const light = new THREE.DirectionalLight();
        mujocoRoot.add(light);
    }

    for (let b = 0; b < model.nbody; b++) {
        //let parent_body = model.body_parentid()[b];
        if (b == 0 || !bodies[0]) {
            mujocoRoot.add(bodies[b]);
        } else if (bodies[b]) {
            bodies[0].add(bodies[b]);
        } else {
            console.log("Body without Geometry detected; adding to bodies", b, bodies[b]);
            bodies[b] = new THREE.Group();
            bodies[b].name = names[b + 1];
            bodies[b].bodyID = b;
            bodies[b].has_custom_mesh = false;
            bodies[0].add(bodies[b]);
        }
    }

    return new UpdateProps(bodies, lights, cylinders, spheres);
};

export const updateThreeScene = (
    mujocoContainer: MujocoContainer,
    updateProps: UpdateProps,
    tmpVec: THREE.Vector3
): void => {

    const simulation = mujocoContainer.getSimulation();
    const model = simulation.model()

    const bodies = updateProps.getBodies();
    const lights = updateProps.getLights();
    const cylinders = updateProps.getCylinders();
    const spheres = updateProps.getSpheres();

    // Update body transforms.
    for (let b = 0; b < model.nbody; b++) {
        if (bodies[b]) {
            getPosition(simulation.xpos, b, bodies[b].position);
            getQuaternion(simulation.xquat, b, bodies[b].quaternion);
            bodies[b].updateWorldMatrix(true, true);
        }
    }

    // Update light transforms.

    for (let l = 0; l < model.nlight; l++) {
        if (lights[l]) {
            getPosition(simulation.light_xpos, l, lights[l].position);
            getPosition(simulation.light_xdir, l, tmpVec);
            lights[l].lookAt(tmpVec.add(lights[l].position));
        }
    }

    // Update tendon transforms.

    let numWraps = 0;
    if (cylinders && spheres) {
        const mat = new THREE.Matrix4();
        for (let t = 0; t < model.ntendon; t++) {
            const startW = simulation.ten_wrapadr[t];
            const r = model.tendon_width[t];
            for (let w = startW; w < startW + simulation.ten_wrapnum[t] - 1; w++) {
                const tendonStart = getPosition(simulation.wrap_xpos, w, new THREE.Vector3());
                const tendonEnd = getPosition(simulation.wrap_xpos, w + 1, new THREE.Vector3());
                const tendonAvg = new THREE.Vector3()
                    .addVectors(tendonStart, tendonEnd)
                    .multiplyScalar(0.5);

                const validStart = tendonStart.length() > 0.01;
                const validEnd = tendonEnd.length() > 0.01;

                if (validStart) {
                    spheres.setMatrixAt(
                        numWraps,
                        mat.compose(tendonStart, new THREE.Quaternion(), new THREE.Vector3(r, r, r))
                    );
                }

                if (validEnd) {
                    spheres.setMatrixAt(
                        numWraps + 1,
                        mat.compose(tendonEnd, new THREE.Quaternion(), new THREE.Vector3(r, r, r))
                    );
                }

                if (validStart && validEnd) {
                    mat.compose(
                        tendonAvg,
                        new THREE.Quaternion().setFromUnitVectors(
                            new THREE.Vector3(0, 1, 0),
                            tendonEnd.clone().sub(tendonStart).normalize()
                        ),
                        new THREE.Vector3(r, tendonStart.distanceTo(tendonEnd), r)
                    );
                    cylinders.setMatrixAt(numWraps, mat);
                    numWraps++;
                }
            }
        }
        cylinders.count = numWraps;
        spheres.count = numWraps > 0 ? numWraps + 1 : 0;
        cylinders.instanceMatrix.needsUpdate = true;
        spheres.instanceMatrix.needsUpdate = true;
    }

    simulation.kinematics();
};

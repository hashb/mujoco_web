/**
 * Types definition for Mujoco Model, State, and Simulation.
 * This is all hand-written code, no tool has been used to generate it.
 */

// Standard types from https://github.com/DefinitelyTyped/DefinitelyTyped
import { EmscriptenModule } from "emscripten";

export class Model {
  constructor(path: string): Model;
  static load_from_xml(str: string): Model;
  /** Free the memory associated with the model */
  free(): void;
  /** Retrive various parameters of the current simulation */
  getOptions(): unknown;

  // MODEL_INTERFACE
  /** number of generalized coordinates = dim(qpos)*/
  nq: number;
  /** number of degrees of freedom = dim(qvel)*/
  nv: number;
  /** number of actuators/controls = dim(ctrl)*/
  nu: number;
  /** number of activation states = dim(act)*/
  na: number;
  /** number of bodies*/
  nbody: number;
  /** number of joints*/
  njnt: number;
  /** number of geoms*/
  ngeom: number;
  /** number of sites*/
  nsite: number;
  /** number of cameras*/
  ncam: number;
  /** number of lights*/
  nlight: number;
  /** number of meshes*/
  nmesh: number;
  /** number of vertices in all meshes*/
  nmeshvert: number;
  /** number of vertices with texcoords in all meshes*/
  nmeshtexvert: number;
  /** number of triangular faces in all meshes*/
  nmeshface: number;
  /** number of ints in mesh auxiliary data*/
  nmeshgraph: number;
  /** number of skins*/
  nskin: number;
  /** number of vertices in all skins*/
  nskinvert: number;
  /** number of vertiex with texcoords in all skins*/
  nskintexvert: number;
  /** number of triangular faces in all skins*/
  nskinface: number;
  /** number of bones in all skins*/
  nskinbone: number;
  /** number of vertices in all skin bones*/
  nskinbonevert: number;
  /** number of heightfields*/
  nhfield: number;
  /** number of data points in all heightfields*/
  nhfielddata: number;
  /** number of textures*/
  ntex: number;
  /** number of bytes in texture rgb data*/
  ntexdata: number;
  /** number of materials*/
  nmat: number;
  /** number of predefined geom pairs*/
  npair: number;
  /** number of excluded geom pairs*/
  nexclude: number;
  /** number of equality constraints*/
  neq: number;
  /** number of tendons*/
  ntendon: number;
  /** number of wrap objects in all tendon paths*/
  nwrap: number;
  /** number of sensors*/
  nsensor: number;
  /** number of numeric custom fields*/
  nnumeric: number;
  /** number of mjtNums in all numeric fields*/
  nnumericdata: number;
  /** number of text custom fields*/
  ntext: number;
  /** number of mjtBytes in all text fields*/
  ntextdata: number;
  /** number of tuple custom fields*/
  ntuple: number;
  /** number of objects in all tuple fields*/
  ntupledata: number;
  /** number of keyframes*/
  nkey: number;
  /** number of mocap bodies*/
  nmocap: number;
  /** number of plugin instances*/
  nplugin: number;
  /** number of chars in all plugin config attributes*/
  npluginattr: number;
  /** number of mjtNums in body_user*/
  nuser_body: number;
  /** number of mjtNums in jnt_user*/
  nuser_jnt: number;
  /** number of mjtNums in geom_user*/
  nuser_geom: number;
  /** number of mjtNums in site_user*/
  nuser_site: number;
  /** number of mjtNums in cam_user*/
  nuser_cam: number;
  /** number of mjtNums in tendon_user*/
  nuser_tendon: number;
  /** number of mjtNums in actuator_user*/
  nuser_actuator: number;
  /** number of mjtNums in sensor_user*/
  nuser_sensor: number;
  /** number of chars in all names*/
  nnames: number;
  /** number of non-zeros in sparse inertia matrix*/
  nM: number;
  /** number of non-zeros in sparse derivative matrix*/
  nD: number;
  /** number of potential equality-constraint rows*/
  nemax: number;
  /** number of available rows in constraint Jacobian*/
  njmax: number;
  /** number of potential contacts in contact list*/
  nconmax: number;
  /** number of fields in mjData stack*/
  nstack: number;
  /** number of extra fields in mjData*/
  nuserdata: number;
  /** number of fields in sensor data vector*/
  nsensordata: number;
  /** number of fields in the plugin state vector*/
  npluginstate: number;
  /** number of bytes in buffer*/
  nbuffer: number;
  /** qpos values at default pose              (nq x 1)*/
  qpos0: Float64Array;
  /** reference pose for springs               (nq x 1)*/
  qpos_spring: Float64Array;
  /** id of body's parent                      (nbody x 1)*/
  body_parentid: Int32Array;
  /** id of root above body                    (nbody x 1)*/
  body_rootid: Int32Array;
  /** id of body that this body is welded to   (nbody x 1)*/
  body_weldid: Int32Array;
  /** id of mocap data; -1: none               (nbody x 1)*/
  body_mocapid: Int32Array;
  /** number of joints for this body           (nbody x 1)*/
  body_jntnum: Int32Array;
  /** start addr of joints; -1: no joints      (nbody x 1)*/
  body_jntadr: Int32Array;
  /** number of motion degrees of freedom      (nbody x 1)*/
  body_dofnum: Int32Array;
  /** start addr of dofs; -1: no dofs          (nbody x 1)*/
  body_dofadr: Int32Array;
  /** number of geoms                          (nbody x 1)*/
  body_geomnum: Int32Array;
  /** start addr of geoms; -1: no geoms        (nbody x 1)*/
  body_geomadr: Int32Array;
  /** body is simple (has diagonal M)          (nbody x 1)*/
  body_simple: Uint8Array;
  /** inertial frame is same as body frame     (nbody x 1)*/
  body_sameframe: Uint8Array;
  /** position offset rel. to parent body      (nbody x 3)*/
  body_pos: Float64Array;
  /** orientation offset rel. to parent body   (nbody x 4)*/
  body_quat: Float64Array;
  /** local position of center of mass         (nbody x 3)*/
  body_ipos: Float64Array;
  /** local orientation of inertia ellipsoid   (nbody x 4)*/
  body_iquat: Float64Array;
  /** mass                                     (nbody x 1)*/
  body_mass: Float64Array;
  /** mass of subtree starting at this body    (nbody x 1)*/
  body_subtreemass: Float64Array;
  /** diagonal inertia in ipos/iquat frame     (nbody x 3)*/
  body_inertia: Float64Array;
  /** mean inv inert in qpos0 (trn, rot)       (nbody x 2)*/
  body_invweight0: Float64Array;
  /** antigravity force, units of body weight  (nbody x 1)*/
  body_gravcomp: Float64Array;
  /** user data                                (nbody x nuser_body)*/
  body_user: Float64Array;
  /** plugin instance id (-1 if not in use)    (nbody x 1)*/
  body_plugin: Int32Array;
  /** type of joint (mjtJoint)                 (njnt x 1)*/
  jnt_type: Int32Array;
  /** start addr in 'qpos' for joint's data    (njnt x 1)*/
  jnt_qposadr: Int32Array;
  /** start addr in 'qvel' for joint's data    (njnt x 1)*/
  jnt_dofadr: Int32Array;
  /** id of joint's body                       (njnt x 1)*/
  jnt_bodyid: Int32Array;
  /** group for visibility                     (njnt x 1)*/
  jnt_group: Int32Array;
  /** does joint have limits                   (njnt x 1)*/
  jnt_limited: Uint8Array;
  /** constraint solver reference: limit       (njnt x mjNREF)*/
  jnt_solref: Float64Array;
  /** constraint solver impedance: limit       (njnt x mjNIMP)*/
  jnt_solimp: Float64Array;
  /** local anchor position                    (njnt x 3)*/
  jnt_pos: Float64Array;
  /** local joint axis                         (njnt x 3)*/
  jnt_axis: Float64Array;
  /** stiffness coefficient                    (njnt x 1)*/
  jnt_stiffness: Float64Array;
  /** joint limits                             (njnt x 2)*/
  jnt_range: Float64Array;
  /** min distance for limit detection         (njnt x 1)*/
  jnt_margin: Float64Array;
  /** user data                                (njnt x nuser_jnt)*/
  jnt_user: Float64Array;
  /** id of dof's body                         (nv x 1)*/
  dof_bodyid: Int32Array;
  /** id of dof's joint                        (nv x 1)*/
  dof_jntid: Int32Array;
  /** id of dof's parent; -1: none             (nv x 1)*/
  dof_parentid: Int32Array;
  /** dof address in M-diagonal                (nv x 1)*/
  dof_Madr: Int32Array;
  /** number of consecutive simple dofs        (nv x 1)*/
  dof_simplenum: Int32Array;
  /** constraint solver reference:frictionloss (nv x mjNREF)*/
  dof_solref: Float64Array;
  /** constraint solver impedance:frictionloss (nv x mjNIMP)*/
  dof_solimp: Float64Array;
  /** dof friction loss                        (nv x 1)*/
  dof_frictionloss: Float64Array;
  /** dof armature inertia/mass                (nv x 1)*/
  dof_armature: Float64Array;
  /** damping coefficient                      (nv x 1)*/
  dof_damping: Float64Array;
  /** diag. inverse inertia in qpos0           (nv x 1)*/
  dof_invweight0: Float64Array;
  /** diag. inertia in qpos0                   (nv x 1)*/
  dof_M0: Float64Array;
  /** geometric type (mjtGeom)                 (ngeom x 1)*/
  geom_type: Int32Array;
  /** geom contact type                        (ngeom x 1)*/
  geom_contype: Int32Array;
  /** geom contact affinity                    (ngeom x 1)*/
  geom_conaffinity: Int32Array;
  /** contact dimensionality (1, 3, 4, 6)      (ngeom x 1)*/
  geom_condim: Int32Array;
  /** id of geom's body                        (ngeom x 1)*/
  geom_bodyid: Int32Array;
  /** id of geom's mesh/hfield (-1: none)      (ngeom x 1)*/
  geom_dataid: Int32Array;
  /** material id for rendering                (ngeom x 1)*/
  geom_matid: Int32Array;
  /** group for visibility                     (ngeom x 1)*/
  geom_group: Int32Array;
  /** geom contact priority                    (ngeom x 1)*/
  geom_priority: Int32Array;
  /** same as body frame (1) or iframe (2)     (ngeom x 1)*/
  geom_sameframe: Uint8Array;
  /** mixing coef for solref/imp in geom pair  (ngeom x 1)*/
  geom_solmix: Float64Array;
  /** constraint solver reference: contact     (ngeom x mjNREF)*/
  geom_solref: Float64Array;
  /** constraint solver impedance: contact     (ngeom x mjNIMP)*/
  geom_solimp: Float64Array;
  /** geom-specific size parameters            (ngeom x 3)*/
  geom_size: Float64Array;
  /** radius of bounding sphere                (ngeom x 1)*/
  geom_rbound: Float64Array;
  /** local position offset rel. to body       (ngeom x 3)*/
  geom_pos: Float64Array;
  /** local orientation offset rel. to body    (ngeom x 4)*/
  geom_quat: Float64Array;
  /** friction for (slide, spin, roll)         (ngeom x 3)*/
  geom_friction: Float64Array;
  /** detect contact if dist<margin            (ngeom x 1)*/
  geom_margin: Float64Array;
  /** include in solver if dist<margin-gap     (ngeom x 1)*/
  geom_gap: Float64Array;
  /** fluid interaction parameters             (ngeom x mjNFLUID)*/
  geom_fluid: Float64Array;
  /** user data                                (ngeom x nuser_geom)*/
  geom_user: Float64Array;
  /** rgba when material is omitted            (ngeom x 4)*/
  geom_rgba: Float32Array;
  /** geom type for rendering (mjtGeom)        (nsite x 1)*/
  site_type: Int32Array;
  /** id of site's body                        (nsite x 1)*/
  site_bodyid: Int32Array;
  /** material id for rendering                (nsite x 1)*/
  site_matid: Int32Array;
  /** group for visibility                     (nsite x 1)*/
  site_group: Int32Array;
  /** same as body frame (1) or iframe (2)     (nsite x 1)*/
  site_sameframe: Uint8Array;
  /** geom size for rendering                  (nsite x 3)*/
  site_size: Float64Array;
  /** local position offset rel. to body       (nsite x 3)*/
  site_pos: Float64Array;
  /** local orientation offset rel. to body    (nsite x 4)*/
  site_quat: Float64Array;
  /** user data                                (nsite x nuser_site)*/
  site_user: Float64Array;
  /** rgba when material is omitted            (nsite x 4)*/
  site_rgba: Float32Array;
  /** camera tracking mode (mjtCamLight)       (ncam x 1)*/
  cam_mode: Int32Array;
  /** id of camera's body                      (ncam x 1)*/
  cam_bodyid: Int32Array;
  /** id of targeted body; -1: none            (ncam x 1)*/
  cam_targetbodyid: Int32Array;
  /** position rel. to body frame              (ncam x 3)*/
  cam_pos: Float64Array;
  /** orientation rel. to body frame           (ncam x 4)*/
  cam_quat: Float64Array;
  /** global position rel. to sub-com in qpos0 (ncam x 3)*/
  cam_poscom0: Float64Array;
  /** global position rel. to body in qpos0    (ncam x 3)*/
  cam_pos0: Float64Array;
  /** global orientation in qpos0              (ncam x 9)*/
  cam_mat0: Float64Array;
  /** y-field of view (deg)                    (ncam x 1)*/
  cam_fovy: Float64Array;
  /** inter-pupilary distance                  (ncam x 1)*/
  cam_ipd: Float64Array;
  /** user data                                (ncam x nuser_cam)*/
  cam_user: Float64Array;
  /** light tracking mode (mjtCamLight)        (nlight x 1)*/
  light_mode: Int32Array;
  /** id of light's body                       (nlight x 1)*/
  light_bodyid: Int32Array;
  /** id of targeted body; -1: none            (nlight x 1)*/
  light_targetbodyid: Int32Array;
  /** directional light                        (nlight x 1)*/
  light_directional: Uint8Array;
  /** does light cast shadows                  (nlight x 1)*/
  light_castshadow: Uint8Array;
  /** is light on                              (nlight x 1)*/
  light_active: Uint8Array;
  /** position rel. to body frame              (nlight x 3)*/
  light_pos: Float64Array;
  /** direction rel. to body frame             (nlight x 3)*/
  light_dir: Float64Array;
  /** global position rel. to sub-com in qpos0 (nlight x 3)*/
  light_poscom0: Float64Array;
  /** global position rel. to body in qpos0    (nlight x 3)*/
  light_pos0: Float64Array;
  /** global direction in qpos0                (nlight x 3)*/
  light_dir0: Float64Array;
  /** OpenGL attenuation (quadratic model)     (nlight x 3)*/
  light_attenuation: Float32Array;
  /** OpenGL cutoff                            (nlight x 1)*/
  light_cutoff: Float32Array;
  /** OpenGL exponent                          (nlight x 1)*/
  light_exponent: Float32Array;
  /** ambient rgb (alpha=1)                    (nlight x 3)*/
  light_ambient: Float32Array;
  /** diffuse rgb (alpha=1)                    (nlight x 3)*/
  light_diffuse: Float32Array;
  /** specular rgb (alpha=1)                   (nlight x 3)*/
  light_specular: Float32Array;
  /** first vertex address                     (nmesh x 1)*/
  mesh_vertadr: Int32Array;
  /** number of vertices                       (nmesh x 1)*/
  mesh_vertnum: Int32Array;
  /** texcoord data address; -1: no texcoord   (nmesh x 1)*/
  mesh_texcoordadr: Int32Array;
  /** first face address                       (nmesh x 1)*/
  mesh_faceadr: Int32Array;
  /** number of faces                          (nmesh x 1)*/
  mesh_facenum: Int32Array;
  /** graph data address; -1: no graph         (nmesh x 1)*/
  mesh_graphadr: Int32Array;
  /** vertex positions for all meshes          (nmeshvert x 3)*/
  mesh_vert: Float32Array;
  /** vertex normals for all meshes            (nmeshvert x 3)*/
  mesh_normal: Float32Array;
  /** vertex texcoords for all meshes          (nmeshtexvert x 2)*/
  mesh_texcoord: Float32Array;
  /** triangle face data                       (nmeshface x 3)*/
  mesh_face: Int32Array;
  /** convex graph data                        (nmeshgraph x 1)*/
  mesh_graph: Int32Array;
  /** skin material id; -1: none               (nskin x 1)*/
  skin_matid: Int32Array;
  /** group for visibility                     (nskin x 1)*/
  skin_group: Int32Array;
  /** skin rgba                                (nskin x 4)*/
  skin_rgba: Float32Array;
  /** inflate skin in normal direction         (nskin x 1)*/
  skin_inflate: Float32Array;
  /** first vertex address                     (nskin x 1)*/
  skin_vertadr: Int32Array;
  /** number of vertices                       (nskin x 1)*/
  skin_vertnum: Int32Array;
  /** texcoord data address; -1: no texcoord   (nskin x 1)*/
  skin_texcoordadr: Int32Array;
  /** first face address                       (nskin x 1)*/
  skin_faceadr: Int32Array;
  /** number of faces                          (nskin x 1)*/
  skin_facenum: Int32Array;
  /** first bone in skin                       (nskin x 1)*/
  skin_boneadr: Int32Array;
  /** number of bones in skin                  (nskin x 1)*/
  skin_bonenum: Int32Array;
  /** vertex positions for all skin meshes     (nskinvert x 3)*/
  skin_vert: Float32Array;
  /** vertex texcoords for all skin meshes     (nskintexvert x 2)*/
  skin_texcoord: Float32Array;
  /** triangle faces for all skin meshes       (nskinface x 3)*/
  skin_face: Int32Array;
  /** first vertex in each bone                (nskinbone x 1)*/
  skin_bonevertadr: Int32Array;
  /** number of vertices in each bone          (nskinbone x 1)*/
  skin_bonevertnum: Int32Array;
  /** bind pos of each bone                    (nskinbone x 3)*/
  skin_bonebindpos: Float32Array;
  /** bind quat of each bone                   (nskinbone x 4)*/
  skin_bonebindquat: Float32Array;
  /** body id of each bone                     (nskinbone x 1)*/
  skin_bonebodyid: Int32Array;
  /** mesh ids of vertices in each bone        (nskinbonevert x 1)*/
  skin_bonevertid: Int32Array;
  /** weights of vertices in each bone         (nskinbonevert x 1)*/
  skin_bonevertweight: Float32Array;
  /** (x, y, z_top, z_bottom)                  (nhfield x 4)*/
  hfield_size: Float64Array;
  /** number of rows in grid                   (nhfield x 1)*/
  hfield_nrow: Int32Array;
  /** number of columns in grid                (nhfield x 1)*/
  hfield_ncol: Int32Array;
  /** address in hfield_data                   (nhfield x 1)*/
  hfield_adr: Int32Array;
  /** elevation data                           (nhfielddata x 1)*/
  hfield_data: Float32Array;
  /** texture type (mjtTexture)                (ntex x 1)*/
  tex_type: Int32Array;
  /** number of rows in texture image          (ntex x 1)*/
  tex_height: Int32Array;
  /** number of columns in texture image       (ntex x 1)*/
  tex_width: Int32Array;
  /** address in rgb                           (ntex x 1)*/
  tex_adr: Int32Array;
  /** rgb (alpha = 1)                          (ntexdata x 1)*/
  tex_rgb: Uint8Array;
  /** texture id; -1: none                     (nmat x 1)*/
  mat_texid: Int32Array;
  /** make texture cube uniform                (nmat x 1)*/
  mat_texuniform: Uint8Array;
  /** texture repetition for 2d mapping        (nmat x 2)*/
  mat_texrepeat: Float32Array;
  /** emission (x rgb)                         (nmat x 1)*/
  mat_emission: Float32Array;
  /** specular (x white)                       (nmat x 1)*/
  mat_specular: Float32Array;
  /** shininess coef                           (nmat x 1)*/
  mat_shininess: Float32Array;
  /** reflectance (0: disable)                 (nmat x 1)*/
  mat_reflectance: Float32Array;
  /** rgba                                     (nmat x 4)*/
  mat_rgba: Float32Array;
  /** contact dimensionality                   (npair x 1)*/
  pair_dim: Int32Array;
  /** id of geom1                              (npair x 1)*/
  pair_geom1: Int32Array;
  /** id of geom2                              (npair x 1)*/
  pair_geom2: Int32Array;
  /** (body1+1)<<16 + body2+1                  (npair x 1)*/
  pair_signature: Int32Array;
  /** constraint solver reference: contact     (npair x mjNREF)*/
  pair_solref: Float64Array;
  /** constraint solver impedance: contact     (npair x mjNIMP)*/
  pair_solimp: Float64Array;
  /** detect contact if dist<margin            (npair x 1)*/
  pair_margin: Float64Array;
  /** include in solver if dist<margin-gap     (npair x 1)*/
  pair_gap: Float64Array;
  /** tangent1, 2, spin, roll1, 2              (npair x 5)*/
  pair_friction: Float64Array;
  /** (body1+1)<<16 + body2+1                  (nexclude x 1)*/
  exclude_signature: Int32Array;
  /** constraint type (mjtEq)                  (neq x 1)*/
  eq_type: Int32Array;
  /** id of object 1                           (neq x 1)*/
  eq_obj1id: Int32Array;
  /** id of object 2                           (neq x 1)*/
  eq_obj2id: Int32Array;
  /** enable/disable constraint                (neq x 1)*/
  eq_active: Uint8Array;
  /** constraint solver reference              (neq x mjNREF)*/
  eq_solref: Float64Array;
  /** constraint solver impedance              (neq x mjNIMP)*/
  eq_solimp: Float64Array;
  /** numeric data for constraint              (neq x mjNEQDATA)*/
  eq_data: Float64Array;
  /** address of first object in tendon's path (ntendon x 1)*/
  tendon_adr: Int32Array;
  /** number of objects in tendon's path       (ntendon x 1)*/
  tendon_num: Int32Array;
  /** material id for rendering                (ntendon x 1)*/
  tendon_matid: Int32Array;
  /** group for visibility                     (ntendon x 1)*/
  tendon_group: Int32Array;
  /** does tendon have length limits           (ntendon x 1)*/
  tendon_limited: Uint8Array;
  /** width for rendering                      (ntendon x 1)*/
  tendon_width: Float64Array;
  /** constraint solver reference: limit       (ntendon x mjNREF)*/
  tendon_solref_lim: Float64Array;
  /** constraint solver impedance: limit       (ntendon x mjNIMP)*/
  tendon_solimp_lim: Float64Array;
  /** constraint solver reference: friction    (ntendon x mjNREF)*/
  tendon_solref_fri: Float64Array;
  /** constraint solver impedance: friction    (ntendon x mjNIMP)*/
  tendon_solimp_fri: Float64Array;
  /** tendon length limits                     (ntendon x 2)*/
  tendon_range: Float64Array;
  /** min distance for limit detection         (ntendon x 1)*/
  tendon_margin: Float64Array;
  /** stiffness coefficient                    (ntendon x 1)*/
  tendon_stiffness: Float64Array;
  /** damping coefficient                      (ntendon x 1)*/
  tendon_damping: Float64Array;
  /** loss due to friction                     (ntendon x 1)*/
  tendon_frictionloss: Float64Array;
  /** spring resting length range              (ntendon x 2)*/
  tendon_lengthspring: Float64Array;
  /** tendon length in qpos0                   (ntendon x 1)*/
  tendon_length0: Float64Array;
  /** inv. weight in qpos0                     (ntendon x 1)*/
  tendon_invweight0: Float64Array;
  /** user data                                (ntendon x nuser_tendon)*/
  tendon_user: Float64Array;
  /** rgba when material is omitted            (ntendon x 4)*/
  tendon_rgba: Float32Array;
  /** wrap object type (mjtWrap)               (nwrap x 1)*/
  wrap_type: Int32Array;
  /** object id: geom, site, joint             (nwrap x 1)*/
  wrap_objid: Int32Array;
  /** divisor, joint coef, or site id          (nwrap x 1)*/
  wrap_prm: Float64Array;
  /** transmission type (mjtTrn)               (nu x 1)*/
  actuator_trntype: Int32Array;
  /** dynamics type (mjtDyn)                   (nu x 1)*/
  actuator_dyntype: Int32Array;
  /** gain type (mjtGain)                      (nu x 1)*/
  actuator_gaintype: Int32Array;
  /** bias type (mjtBias)                      (nu x 1)*/
  actuator_biastype: Int32Array;
  /** transmission id: joint, tendon, site     (nu x 2)*/
  actuator_trnid: Int32Array;
  /** first activation address; -1: stateless  (nu x 1)*/
  actuator_actadr: Int32Array;
  /** number of activation variables           (nu x 1)*/
  actuator_actnum: Int32Array;
  /** group for visibility                     (nu x 1)*/
  actuator_group: Int32Array;
  /** is control limited                       (nu x 1)*/
  actuator_ctrllimited: Uint8Array;
  /** is force limited                         (nu x 1)*/
  actuator_forcelimited: Uint8Array;
  /** is activation limited                    (nu x 1)*/
  actuator_actlimited: Uint8Array;
  /** dynamics parameters                      (nu x mjNDYN)*/
  actuator_dynprm: Float64Array;
  /** gain parameters                          (nu x mjNGAIN)*/
  actuator_gainprm: Float64Array;
  /** bias parameters                          (nu x mjNBIAS)*/
  actuator_biasprm: Float64Array;
  /** range of controls                        (nu x 2)*/
  actuator_ctrlrange: Float64Array;
  /** range of forces                          (nu x 2)*/
  actuator_forcerange: Float64Array;
  /** range of activations                     (nu x 2)*/
  actuator_actrange: Float64Array;
  /** scale length and transmitted force       (nu x 6)*/
  actuator_gear: Float64Array;
  /** crank length for slider-crank            (nu x 1)*/
  actuator_cranklength: Float64Array;
  /** acceleration from unit force in qpos0    (nu x 1)*/
  actuator_acc0: Float64Array;
  /** actuator length in qpos0                 (nu x 1)*/
  actuator_length0: Float64Array;
  /** feasible actuator length range           (nu x 2)*/
  actuator_lengthrange: Float64Array;
  /** user data                                (nu x nuser_actuator)*/
  actuator_user: Float64Array;
  /** plugin instance id; -1: not a plugin     (nu x 1)*/
  actuator_plugin: Int32Array;
  /** sensor type (mjtSensor)                  (nsensor x 1)*/
  sensor_type: Int32Array;
  /** numeric data type (mjtDataType)          (nsensor x 1)*/
  sensor_datatype: Int32Array;
  /** required compute stage (mjtStage)        (nsensor x 1)*/
  sensor_needstage: Int32Array;
  /** type of sensorized object (mjtObj)       (nsensor x 1)*/
  sensor_objtype: Int32Array;
  /** id of sensorized object                  (nsensor x 1)*/
  sensor_objid: Int32Array;
  /** type of reference frame (mjtObj)         (nsensor x 1)*/
  sensor_reftype: Int32Array;
  /** id of reference frame; -1: global frame  (nsensor x 1)*/
  sensor_refid: Int32Array;
  /** number of scalar outputs                 (nsensor x 1)*/
  sensor_dim: Int32Array;
  /** address in sensor array                  (nsensor x 1)*/
  sensor_adr: Int32Array;
  /** cutoff for real and positive; 0: ignore  (nsensor x 1)*/
  sensor_cutoff: Float64Array;
  /** noise standard deviation                 (nsensor x 1)*/
  sensor_noise: Float64Array;
  /** user data                                (nsensor x nuser_sensor)*/
  sensor_user: Float64Array;
  /** plugin instance id; -1: not a plugin     (nsensor x 1)*/
  sensor_plugin: Int32Array;
  /** plugin instance id (-1 if not in use)    (nbody x 1)*/
  plugin: Int32Array;
  /** address in the plugin state array        (nplugin x 1)*/
  plugin_stateadr: Int32Array;
  /** number of states in the plugin instance  (nplugin x 1)*/
  plugin_statenum: Int32Array;
  /** config attributes of plugin instances    (npluginattr x 1)*/
  plugin_attr: Uint8Array;
  /** address to each instance's config attrib (nplugin x 1)*/
  plugin_attradr: Int32Array;
  /** address of field in numeric_data         (nnumeric x 1)*/
  numeric_adr: Int32Array;
  /** size of numeric field                    (nnumeric x 1)*/
  numeric_size: Int32Array;
  /** array of all numeric fields              (nnumericdata x 1)*/
  numeric_data: Float64Array;
  /** address of text in text_data             (ntext x 1)*/
  text_adr: Int32Array;
  /** size of text field (strlen+1)            (ntext x 1)*/
  text_size: Int32Array;
  /** array of all text fields (0-terminated)  (ntextdata x 1)*/
  text_data: Uint8Array;
  /** address of text in text_data             (ntuple x 1)*/
  tuple_adr: Int32Array;
  /** number of objects in tuple               (ntuple x 1)*/
  tuple_size: Int32Array;
  /** array of object types in all tuples      (ntupledata x 1)*/
  tuple_objtype: Int32Array;
  /** array of object ids in all tuples        (ntupledata x 1)*/
  tuple_objid: Int32Array;
  /** array of object params in all tuples     (ntupledata x 1)*/
  tuple_objprm: Float64Array;
  /** key time                                 (nkey x 1)*/
  key_time: Float64Array;
  /** key position                             (nkey x nq)*/
  key_qpos: Float64Array;
  /** key velocity                             (nkey x nv)*/
  key_qvel: Float64Array;
  /** key activation                           (nkey x na)*/
  key_act: Float64Array;
  /** key mocap position                       (nkey x 3*nmocap)*/
  key_mpos: Float64Array;
  /** key mocap quaternion                     (nkey x 4*nmocap)*/
  key_mquat: Float64Array;
  /** key control                              (nkey x nu)*/
  key_ctrl: Float64Array;
  /** body name pointers                       (nbody x 1)*/
  name_bodyadr: Int32Array;
  /** joint name pointers                      (njnt x 1)*/
  name_jntadr: Int32Array;
  /** geom name pointers                       (ngeom x 1)*/
  name_geomadr: Int32Array;
  /** site name pointers                       (nsite x 1)*/
  name_siteadr: Int32Array;
  /** camera name pointers                     (ncam x 1)*/
  name_camadr: Int32Array;
  /** light name pointers                      (nlight x 1)*/
  name_lightadr: Int32Array;
  /** mesh name pointers                       (nmesh x 1)*/
  name_meshadr: Int32Array;
  /** skin name pointers                       (nskin x 1)*/
  name_skinadr: Int32Array;
  /** hfield name pointers                     (nhfield x 1)*/
  name_hfieldadr: Int32Array;
  /** texture name pointers                    (ntex x 1)*/
  name_texadr: Int32Array;
  /** material name pointers                   (nmat x 1)*/
  name_matadr: Int32Array;
  /** geom pair name pointers                  (npair x 1)*/
  name_pairadr: Int32Array;
  /** exclude name pointers                    (nexclude x 1)*/
  name_excludeadr: Int32Array;
  /** equality constraint name pointers        (neq x 1)*/
  name_eqadr: Int32Array;
  /** tendon name pointers                     (ntendon x 1)*/
  name_tendonadr: Int32Array;
  /** actuator name pointers                   (nu x 1)*/
  name_actuatoradr: Int32Array;
  /** sensor name pointers                     (nsensor x 1)*/
  name_sensoradr: Int32Array;
  /** numeric name pointers                    (nnumeric x 1)*/
  name_numericadr: Int32Array;
  /** text name pointers                       (ntext x 1)*/
  name_textadr: Int32Array;
  /** tuple name pointers                      (ntuple x 1)*/
  name_tupleadr: Int32Array;
  /** keyframe name pointers                   (nkey x 1)*/
  name_keyadr: Int32Array;
  /** plugin instance name pointers            (nplugin x 1)*/
  name_pluginadr: Int32Array;
  /** names of all objects, 0-terminated       (nnames x 1)*/
  names: Uint8Array;
}

export class State {
  constructor(model: Model): State;
  /** Free the memory associated with the state */
  free(): void;
}

export class Simulation {
  constructor(model: Model, state: State): Simulation;
  state(): State;
  model(): Model;
  /** Free the memory associated with both the model and the state in the simulation */
  free(): void;
  /** Apply cartesian force and torque (outside xfrc_applied mechanism) */
  applyForce(fx: number, fy: number, fz: number, tx: number, ty: number, tz: number, px: number, py: number, pz: number, body_id: number): void;

  /** sets perturb pos,quat in d->mocap when selected body is mocap, and in d->qpos otherwise
   * d->qpos written only if flg_paused and subtree root for selected body has free joint */
  applyPose(bodyID: number,
    refPosX: number, refPosY: number, refPosZ: number,
    refQuat1: number, refQuat2: number, refQuat3: number, refQuat4: number,
    flg_paused: number): void;
}

export declare interface MujocoModule extends EmscriptenModule {
  FS: typeof FS;
  MEMFS: typeof MEMFS;
  Model: typeof Model;
  State: typeof State;
  Simulation: typeof Simulation;
}

// Please note that the wasm.js file does not include Model, State and
// Simulation types.
declare module "./mujoco_wasm" {
  const load_mujoco: EmscriptenModuleFactory<MujocoModule>;
  export default load_mujoco;
}
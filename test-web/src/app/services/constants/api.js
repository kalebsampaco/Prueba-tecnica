export default {
  // baseUrl: 'http://localhost:4000/api/v1',
  baseUrl: process.env.REACT_APP_API_URL,
  endpoints: {
    authenticate: 'authenticate',
    authenticateFunc: 'authenticate_funcionario',
    sendCodeLanding: 'sendCodeLanding',
    verifyEmail: 'verify_email',
    validar_email: 'verificar_persona_email',
    landing_auth: 'landing_auth',
    roles: 'roles',
    users: 'user',
    cities: 'cities',
    cli_clients: 'customers',
    cli_cliente: 'cli_cliente',
    causal_rechazo: 'causal-rechazo',
    causal_devolucion: 'causal-devolucion',
    dashboard: 'dashboard',
    state: 'states',
    procedure: 'tram_categoria',
    tramite: 'tram_tramite',
    tram_categoria_sub: 'tram_categoria_sub',
    official: 'funcionario',
    profile: 'perfil',
    changePassword: 'change_password',
    register_ciudadano: 'register_ciudadano',
    register_funcionario: 'register_funcionario',
    verificar_persona: 'verificar_persona',
    reenviar_codigo: 'enviar_codigo',
    citizen: 'ciudadano',
    tipos_documento: 'tipos_documento',
    tipos_comunicacion: 'tipos_comunicacion',
    buscar_solicitud: 'buscar_solicitud',
    documentacion_anexos: 'documentacion_anexos',
    seguimiento: 'seguimiento',
    solicitud: 'solicitud',
    solicitud_buscar_cordenadas: 'solicitud/buscar',
    solicitud_put_coordenadas: 'solicitud_general/coordenadas_geograficas_punto_captacion',
    solicitud_seven: 'solicitud_seven',
    solicitud_three: 'solicitud_three',
    solicitud_four: 'solicitud_four',
    solicitud_eight: 'solicitud_eight',
    solicitud_eleven: 'solicitud_eleven',
    solicitud_one: 'solicitud_one',
    datos_vertimientos: 'datos_vertimiento',
    etapa: 'etapa',
    etapa_uno_esp: 'etapa_uno',
    etapa_uno: 'etapa_one/verificar_archivo',
    /* etapa_uno_devolver: "etapa_one/devolver_doc",
    etapa_uno_aprobar: "etapa_one/aprobar_doc", */
    etapa_one_documentos: 'etapa_one/respuesta_doc',
    /* etapa_dos_concepto: "etapa_one/verifcar_concepto", */
    etapa_dos_concepto: 'etapa_one/verifcar_concepto_paralelo',
    etapa_tres_liquidacion: 'etapa_one/verifcar_liquidacion',
    etapa_cuatro_pago: 'etapa_one/verifcar_pago',
    cli_usuario: 'cli_usuario',
    cli_usuario_rol: 'cli_usuario_rol',
    territorial: 'territoriales',
    etapa_dos: 'etapa_dos',
    etapa_ciudadano: 'etapa_ciudadano',
    user_solicitante: 'user_solicitante',
    ed_login: 'login',
    ed_expediente: 'put/expediente',
    ed_expedientes: 'get/expedientes',
    ed_expediente_delete: 'delete/evidencia',
    ed_expedientes_filter: 'filter/expediente',
    ed_create_expediente: 'create/expediente',
    ed_expedientes_filter_comunications: 'filter/group/expediente',
    // ed_login: "login",
    // ed_expedientes: "get/expedientes",
    // ed_expedientes_filter: "filter/expediente",
    // ed_create_expediente: "create/expediente",
    ed_url_firmada: 'url/signed',
    ed_archivos_expediente: 'filter/expediente',
    ed_add_meta: 'add/metadatos',
    ed_signed_getput: 'url/signed/getOrPut',
    ed_expediente_search: 'search/nocomunicacion',
    ed_expedientes_search_by_type: 'filter/archives/expediente',
    auto_requerimiento_info: 'auto-requerimiento/info',
    tiempos: 'tiempo_tramite',
    saveLinkPuea: 'saveLinkPuea',
    updateLink: 'updateLink',
    getLinkPuea: 'getLinkPuea',
    getAllLinkPuea: 'getAllLinkPuea',
    fileAnAppeal: 'presentar_recurso',
    autoRequestFile: 'archivo_auto_requerimiento',
    data_solicitante: 'datos_solicitante',
    borrador: 'borrador',
    informacion_general: 'informacion_general',
    aprovechamiento_forestal: 'aprovechamiento_forestal',
    anexos_doc_detalle: 'anexos_doc_detalle',
    anexos_doc: 'anexos_doc',
    anexos_doc_v2: 'anexos_doc_v2',
    anexos_corregidos_etapa_uno: 'anexos_corregidos_etapa_uno',
    saveInterviniente: 'saveInterviniente',
    getAllInterviniente: 'getAllInterviniente',
    updateInterviniente: 'updateInterviniente',
    deleteInterviniente: 'deleteInterviniente',
    actividades_economicas: 'borrador/actividades_economicas',
    getInterviniente: 'getInterviniente',
    solicitud_lista: 'solicitud/lista',
    tercerInterviniente: 'tercer-interviniente',
    tipoTramites: '/tram_tramite/categorias_name',
  },
};

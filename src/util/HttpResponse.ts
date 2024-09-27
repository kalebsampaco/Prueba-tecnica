export class HttpResponse {
  status: boolean;
  message: string;
  data: object;
  prop:any;
  prop2:any;

  constructor() {
    this.status = false;
    this.message = "";
    this.data = {};
  }

  create(nameEntity: string, dataCreated: object) {
    this.status = true;
    this.message = `${nameEntity} created successfully`;
    this.data = dataCreated;
  }

  createMany(nameEntity: string, dataCreated: []) {
    this.status = true;
    this.message = `${nameEntity} created successfully`;
    this.data = dataCreated;
  }

  update(nameEntity: string, dataCreated: object) {
    this.status = true;
    this.message = `${nameEntity} updated successfully`;
    this.data = dataCreated;
  }

  delete(nameEntity: string, dataCreated: object) {
    this.status = true;
    this.message = `${nameEntity} deleted successfully`;
    this.data = dataCreated;
  }

  findOne(dataFinded: object) {
    this.status = true;
    this.message = `Record Found`;
    this.data = dataFinded;
  }

  findAll(allRecords: any) {
    this.status = true;
    this.message = `All Records Found`;
    this.data = allRecords;
  }

  findAllWithProp(allRecords: any, prop:any, prop2:any) {
    this.status = true;
    this.message = `All Records Found`;
    this.data = allRecords;
    this.prop = prop
    this.prop2 = prop2
  }

  accessDenied() {
    this.message = `Acceso denegado`;
    this.data = { status: 401 };
  }

  findOnesByQuery(queryRecords: any) {
    this.status = true;
    this.message = `Data of your search`;
    this.data = queryRecords;
  }

  saveTempFile(url: any) {
    this.status = true;
    this.message = `Temporary location for your file`;
    this.data = url;
  }

  emptyRecords() {
    this.message = "Not records found";
    this.data = [];
  }

  notFileSend() {
    this.message = "File not send";
    this.data = [];
  }

  errorEntityDuplicated(nameEntity: string, id: any) {
    this.message = `${nameEntity} with ID ${id} is already in our database`;
  }

  errorDuplicated() {
    this.message = "This record is already in our database";
  }

  errorFieldDuplicated(recordDuplicated: string, id: any) {
    this.message = `This ${recordDuplicated} with field ${id} is already in our database`;
  }

  errorEmptyObject(dataReceived: object) {
    this.message = `Data received to request is empty`;
    this.data = dataReceived;
  }

  errorEmptyObjectSpanish(dataReceived: object) {
    this.message = `La información para procesar la solicitud esta vacía`;
    this.data = dataReceived;
  }

  error(message: any, data?: object) {
    this.message = message;
    this.data = { data };
  }

  errorS3(message: string, dataReceived: object) {
    this.message = message;
    this.data = dataReceived;
  }

  errorFormatInvalid(numberID: any) {
    this.message = `ID received { id: ${numberID} }  is not number valid, check if is not empty or another type (string, null, undefined) etc`;
    // return this.message;
  }

  errorNotFoundID(nameEntity: string, id: any) {
    this.message = `${nameEntity} with ID ${id} was not found`;
  }

  errorNotRecordFound(nameEntity: string, field: string, value: any) {
    this.message = `${nameEntity} with field ${field} ${value} was not found`;
  }

  errorNotRecordFoundSpanish(nameEntity: string, field: string, value: any) {
    this.message = `${nameEntity} con ${field} ${value} no se encuentra registrado`;
  }

  errorRol() {
    this.message = "Su rol no está disponible para iniciar sesión";
  }

  errorNotClientFound(nameEntity: string, field: string, value: any) {
    this.message = `${nameEntity} con el campo ${field} ${value} no es un cliente de Vigpro`;
  }

  errorWithEmail(email: string, thing: string) {
    this.message = `El correo electrónico ${email} se ha eliminado de nuestra base de datos o ${thing} verificado`;
  }

  emailVerified(email: string) {
    this.status = true;
    this.message = `El correo electrónico ${email} se ha verificado correctamente`;
  }

  errorCredencials() {
    this.message = `Credenciales incorrectas`;
  }

  success(message: string, data: object) {
    this.status = true;
    this.message = message;
    this.data = { data };
  }

  errorSolicitud() {
    this.message = "¡Usuario no autorizado para gestionar este tramite!";
  }
}

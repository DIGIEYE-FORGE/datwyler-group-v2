
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.14.1
 * Query Engine version: d9a4c5988f480fa576d43970d5a23641aa77bc9c
 */
Prisma.prismaVersion = {
  client: "4.14.1",
  engine: "d9a4c5988f480fa576d43970d5a23641aa77bc9c"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.AlertScalarFieldEnum = {
  id: 'id',
  deviceId: 'deviceId',
  type: 'type',
  message: 'message',
  level: 'level',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  attributes: 'attributes',
  acknowledgedBy: 'acknowledgedBy'
};

exports.Prisma.AttributeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  value: 'value',
  deviceId: 'deviceId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CredentialScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password: 'password',
  token: 'token',
  certificate: 'certificate',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DecoderScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  fnc: 'fnc',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tenantId: 'tenantId'
};

exports.Prisma.DeviceProfileScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  logo: 'logo',
  cridentialsType: 'cridentialsType',
  deviceTypeId: 'deviceTypeId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  protocolId: 'protocolId',
  decoderId: 'decoderId',
  attributes: 'attributes',
  tenantId: 'tenantId'
};

exports.Prisma.DeviceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  serial: 'serial',
  isPassive: 'isPassive',
  isOnline: 'isOnline',
  isdecoded: 'isdecoded',
  credentialId: 'credentialId',
  configuration: 'configuration',
  deviceProfileId: 'deviceProfileId',
  firmwareId: 'firmwareId',
  ip: 'ip',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  virtualDeviceId: 'virtualDeviceId',
  groupId: 'groupId',
  tenantId: 'tenantId'
};

exports.Prisma.DeviceTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tenantId: 'tenantId'
};

exports.Prisma.FirmwareScalarFieldEnum = {
  id: 'id',
  name: 'name',
  version: 'version',
  description: 'description',
  url: 'url',
  size: 'size',
  hash: 'hash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tenantId: 'tenantId'
};

exports.Prisma.GroupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  parentId: 'parentId',
  location: 'location',
  lat: 'lat',
  lng: 'lng',
  ip: 'ip',
  attributes: 'attributes',
  tenantId: 'tenantId'
};

exports.Prisma.HistoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  value: 'value',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deviceId: 'deviceId'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.LastTelemetryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  value: 'value',
  alias: 'alias',
  icon: 'icon',
  color: 'color',
  show: 'show',
  deviceId: 'deviceId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.ProtocolScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tenantId: 'tenantId'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.ReportScalarFieldEnum = {
  id: 'id',
  name: 'name',
  tenantId: 'tenantId',
  query: 'query',
  type: 'type',
  format: 'format',
  url: 'url',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.TagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.VirtualDeviceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tenantId: 'tenantId'
};

exports.Prisma.VmqAuthAclScalarFieldEnum = {
  id: 'id',
  mountpoint: 'mountpoint',
  username: 'username',
  clientId: 'clientId',
  password: 'password',
  publishAcl: 'publishAcl',
  subscribeAcl: 'subscribeAcl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};
exports.TypeCredential = {
  TOKEN: 'TOKEN',
  CERTIFICATE: 'CERTIFICATE',
  USERPASSWORD: 'USERPASSWORD'
};

exports.Prisma.ModelName = {
  VirtualDevice: 'VirtualDevice',
  Group: 'Group',
  Alert: 'Alert',
  Decoder: 'Decoder',
  DeviceType: 'DeviceType',
  Firmware: 'Firmware',
  Protocol: 'Protocol',
  DeviceProfile: 'DeviceProfile',
  Credential: 'Credential',
  Tag: 'Tag',
  VmqAuthAcl: 'VmqAuthAcl',
  Device: 'Device',
  Attribute: 'Attribute',
  LastTelemetry: 'LastTelemetry',
  Report: 'Report',
  History: 'History'
};

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

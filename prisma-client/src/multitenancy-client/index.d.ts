
/**
 * Client
**/

import * as runtime from './runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model Tenant
 * 
 */
export type Tenant = {
  id: number
  name: string
  parentId: number | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model UserTeanant
 * 
 */
export type UserTeanant = {
  userId: number
  tenantId: number
  role: Role
  createdAt: Date
  updatedAt: Date
}

/**
 * Model User
 * 
 */
export type User = {
  id: number
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<GlobalReject>;

  /**
   * `prisma.userTeanant`: Exposes CRUD operations for the **UserTeanant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserTeanants
    * const userTeanants = await prisma.userTeanant.findMany()
    * ```
    */
  get userTeanant(): Prisma.UserTeanantDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.14.1
   * Query Engine version: d9a4c5988f480fa576d43970d5a23641aa77bc9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tenant: 'Tenant',
    UserTeanant: 'UserTeanant',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TenantCountOutputType
   */


  export type TenantCountOutputType = {
    children: number
    users: number
  }

  export type TenantCountOutputTypeSelect = {
    children?: boolean
    users?: boolean
  }

  export type TenantCountOutputTypeGetPayload<S extends boolean | null | undefined | TenantCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TenantCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (TenantCountOutputTypeArgs)
    ? TenantCountOutputType 
    : S extends { select: any } & (TenantCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof TenantCountOutputType ? TenantCountOutputType[P] : never
  } 
      : TenantCountOutputType




  // Custom InputTypes

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect | null
  }



  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    tenants: number
  }

  export type UserCountOutputTypeSelect = {
    tenants?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Tenant
   */


  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _avg: TenantAvgAggregateOutputType | null
    _sum: TenantSumAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantAvgAggregateOutputType = {
    id: number | null
    parentId: number | null
  }

  export type TenantSumAggregateOutputType = {
    id: number | null
    parentId: number | null
  }

  export type TenantMinAggregateOutputType = {
    id: number | null
    name: string | null
    parentId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: number | null
    name: string | null
    parentId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    parentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantAvgAggregateInputType = {
    id?: true
    parentId?: true
  }

  export type TenantSumAggregateInputType = {
    id?: true
    parentId?: true
  }

  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantAggregateArgs = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: Enumerable<TenantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TenantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TenantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs = {
    where?: TenantWhereInput
    orderBy?: Enumerable<TenantOrderByWithAggregationInput>
    by: TenantScalarFieldEnum[]
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _avg?: TenantAvgAggregateInputType
    _sum?: TenantSumAggregateInputType
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }


  export type TenantGroupByOutputType = {
    id: number
    name: string
    parentId: number | null
    createdAt: Date
    updatedAt: Date
    _count: TenantCountAggregateOutputType | null
    _avg: TenantAvgAggregateOutputType | null
    _sum: TenantSumAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect = {
    id?: boolean
    name?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | TenantArgs
    children?: boolean | Tenant$childrenArgs
    users?: boolean | Tenant$usersArgs
    _count?: boolean | TenantCountOutputTypeArgs
  }


  export type TenantInclude = {
    parent?: boolean | TenantArgs
    children?: boolean | Tenant$childrenArgs
    users?: boolean | Tenant$usersArgs
    _count?: boolean | TenantCountOutputTypeArgs
  }

  export type TenantGetPayload<S extends boolean | null | undefined | TenantArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Tenant :
    S extends undefined ? never :
    S extends { include: any } & (TenantArgs | TenantFindManyArgs)
    ? Tenant  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'parent' ? TenantGetPayload<S['include'][P]> | null :
        P extends 'children' ? Array < TenantGetPayload<S['include'][P]>>  :
        P extends 'users' ? Array < UserTeanantGetPayload<S['include'][P]>>  :
        P extends '_count' ? TenantCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TenantArgs | TenantFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'parent' ? TenantGetPayload<S['select'][P]> | null :
        P extends 'children' ? Array < TenantGetPayload<S['select'][P]>>  :
        P extends 'users' ? Array < UserTeanantGetPayload<S['select'][P]>>  :
        P extends '_count' ? TenantCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Tenant ? Tenant[P] : never
  } 
      : Tenant


  type TenantCountArgs = 
    Omit<TenantFindManyArgs, 'select' | 'include'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TenantFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TenantFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tenant'> extends True ? Prisma__TenantClient<TenantGetPayload<T>> : Prisma__TenantClient<TenantGetPayload<T> | null, null>

    /**
     * Find one Tenant that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TenantFindUniqueOrThrowArgs>
    ): Prisma__TenantClient<TenantGetPayload<T>>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TenantFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TenantFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tenant'> extends True ? Prisma__TenantClient<TenantGetPayload<T>> : Prisma__TenantClient<TenantGetPayload<T> | null, null>

    /**
     * Find the first Tenant that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TenantFindFirstOrThrowArgs>
    ): Prisma__TenantClient<TenantGetPayload<T>>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TenantFindManyArgs>(
      args?: SelectSubset<T, TenantFindManyArgs>
    ): Prisma.PrismaPromise<Array<TenantGetPayload<T>>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
    **/
    create<T extends TenantCreateArgs>(
      args: SelectSubset<T, TenantCreateArgs>
    ): Prisma__TenantClient<TenantGetPayload<T>>

    /**
     * Create many Tenants.
     *     @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     *     @example
     *     // Create many Tenants
     *     const tenant = await prisma.tenant.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TenantCreateManyArgs>(
      args?: SelectSubset<T, TenantCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
    **/
    delete<T extends TenantDeleteArgs>(
      args: SelectSubset<T, TenantDeleteArgs>
    ): Prisma__TenantClient<TenantGetPayload<T>>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TenantUpdateArgs>(
      args: SelectSubset<T, TenantUpdateArgs>
    ): Prisma__TenantClient<TenantGetPayload<T>>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TenantDeleteManyArgs>(
      args?: SelectSubset<T, TenantDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TenantUpdateManyArgs>(
      args: SelectSubset<T, TenantUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
    **/
    upsert<T extends TenantUpsertArgs>(
      args: SelectSubset<T, TenantUpsertArgs>
    ): Prisma__TenantClient<TenantGetPayload<T>>

    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TenantClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    parent<T extends TenantArgs= {}>(args?: Subset<T, TenantArgs>): Prisma__TenantClient<TenantGetPayload<T> | Null>;

    children<T extends Tenant$childrenArgs= {}>(args?: Subset<T, Tenant$childrenArgs>): Prisma.PrismaPromise<Array<TenantGetPayload<T>>| Null>;

    users<T extends Tenant$usersArgs= {}>(args?: Subset<T, Tenant$usersArgs>): Prisma.PrismaPromise<Array<UserTeanantGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Tenant base type for findUnique actions
   */
  export type TenantFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUnique
   */
  export interface TenantFindUniqueArgs extends TenantFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }


  /**
   * Tenant base type for findFirst actions
   */
  export type TenantFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: Enumerable<TenantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: Enumerable<TenantScalarFieldEnum>
  }

  /**
   * Tenant findFirst
   */
  export interface TenantFindFirstArgs extends TenantFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: Enumerable<TenantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: Enumerable<TenantScalarFieldEnum>
  }


  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: Enumerable<TenantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: Enumerable<TenantScalarFieldEnum>
  }


  /**
   * Tenant create
   */
  export type TenantCreateArgs = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }


  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs = {
    /**
     * The data used to create many Tenants.
     */
    data: Enumerable<TenantCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tenant update
   */
  export type TenantUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }


  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
  }


  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }


  /**
   * Tenant delete
   */
  export type TenantDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }


  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
  }


  /**
   * Tenant.children
   */
  export type Tenant$childrenArgs = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
    where?: TenantWhereInput
    orderBy?: Enumerable<TenantOrderByWithRelationInput>
    cursor?: TenantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TenantScalarFieldEnum>
  }


  /**
   * Tenant.users
   */
  export type Tenant$usersArgs = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    where?: UserTeanantWhereInput
    orderBy?: Enumerable<UserTeanantOrderByWithRelationInput>
    cursor?: UserTeanantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserTeanantScalarFieldEnum>
  }


  /**
   * Tenant without action
   */
  export type TenantArgs = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude | null
  }



  /**
   * Model UserTeanant
   */


  export type AggregateUserTeanant = {
    _count: UserTeanantCountAggregateOutputType | null
    _avg: UserTeanantAvgAggregateOutputType | null
    _sum: UserTeanantSumAggregateOutputType | null
    _min: UserTeanantMinAggregateOutputType | null
    _max: UserTeanantMaxAggregateOutputType | null
  }

  export type UserTeanantAvgAggregateOutputType = {
    userId: number | null
    tenantId: number | null
  }

  export type UserTeanantSumAggregateOutputType = {
    userId: number | null
    tenantId: number | null
  }

  export type UserTeanantMinAggregateOutputType = {
    userId: number | null
    tenantId: number | null
    role: Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserTeanantMaxAggregateOutputType = {
    userId: number | null
    tenantId: number | null
    role: Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserTeanantCountAggregateOutputType = {
    userId: number
    tenantId: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserTeanantAvgAggregateInputType = {
    userId?: true
    tenantId?: true
  }

  export type UserTeanantSumAggregateInputType = {
    userId?: true
    tenantId?: true
  }

  export type UserTeanantMinAggregateInputType = {
    userId?: true
    tenantId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserTeanantMaxAggregateInputType = {
    userId?: true
    tenantId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserTeanantCountAggregateInputType = {
    userId?: true
    tenantId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserTeanantAggregateArgs = {
    /**
     * Filter which UserTeanant to aggregate.
     */
    where?: UserTeanantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTeanants to fetch.
     */
    orderBy?: Enumerable<UserTeanantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserTeanantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTeanants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTeanants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserTeanants
    **/
    _count?: true | UserTeanantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserTeanantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserTeanantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserTeanantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserTeanantMaxAggregateInputType
  }

  export type GetUserTeanantAggregateType<T extends UserTeanantAggregateArgs> = {
        [P in keyof T & keyof AggregateUserTeanant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserTeanant[P]>
      : GetScalarType<T[P], AggregateUserTeanant[P]>
  }




  export type UserTeanantGroupByArgs = {
    where?: UserTeanantWhereInput
    orderBy?: Enumerable<UserTeanantOrderByWithAggregationInput>
    by: UserTeanantScalarFieldEnum[]
    having?: UserTeanantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserTeanantCountAggregateInputType | true
    _avg?: UserTeanantAvgAggregateInputType
    _sum?: UserTeanantSumAggregateInputType
    _min?: UserTeanantMinAggregateInputType
    _max?: UserTeanantMaxAggregateInputType
  }


  export type UserTeanantGroupByOutputType = {
    userId: number
    tenantId: number
    role: Role
    createdAt: Date
    updatedAt: Date
    _count: UserTeanantCountAggregateOutputType | null
    _avg: UserTeanantAvgAggregateOutputType | null
    _sum: UserTeanantSumAggregateOutputType | null
    _min: UserTeanantMinAggregateOutputType | null
    _max: UserTeanantMaxAggregateOutputType | null
  }

  type GetUserTeanantGroupByPayload<T extends UserTeanantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserTeanantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserTeanantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserTeanantGroupByOutputType[P]>
            : GetScalarType<T[P], UserTeanantGroupByOutputType[P]>
        }
      >
    >


  export type UserTeanantSelect = {
    userId?: boolean
    tenantId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserArgs
    tenant?: boolean | TenantArgs
  }


  export type UserTeanantInclude = {
    user?: boolean | UserArgs
    tenant?: boolean | TenantArgs
  }

  export type UserTeanantGetPayload<S extends boolean | null | undefined | UserTeanantArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserTeanant :
    S extends undefined ? never :
    S extends { include: any } & (UserTeanantArgs | UserTeanantFindManyArgs)
    ? UserTeanant  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :
        P extends 'tenant' ? TenantGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserTeanantArgs | UserTeanantFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :
        P extends 'tenant' ? TenantGetPayload<S['select'][P]> :  P extends keyof UserTeanant ? UserTeanant[P] : never
  } 
      : UserTeanant


  type UserTeanantCountArgs = 
    Omit<UserTeanantFindManyArgs, 'select' | 'include'> & {
      select?: UserTeanantCountAggregateInputType | true
    }

  export interface UserTeanantDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one UserTeanant that matches the filter.
     * @param {UserTeanantFindUniqueArgs} args - Arguments to find a UserTeanant
     * @example
     * // Get one UserTeanant
     * const userTeanant = await prisma.userTeanant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserTeanantFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserTeanantFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserTeanant'> extends True ? Prisma__UserTeanantClient<UserTeanantGetPayload<T>> : Prisma__UserTeanantClient<UserTeanantGetPayload<T> | null, null>

    /**
     * Find one UserTeanant that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserTeanantFindUniqueOrThrowArgs} args - Arguments to find a UserTeanant
     * @example
     * // Get one UserTeanant
     * const userTeanant = await prisma.userTeanant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserTeanantFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserTeanantFindUniqueOrThrowArgs>
    ): Prisma__UserTeanantClient<UserTeanantGetPayload<T>>

    /**
     * Find the first UserTeanant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTeanantFindFirstArgs} args - Arguments to find a UserTeanant
     * @example
     * // Get one UserTeanant
     * const userTeanant = await prisma.userTeanant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserTeanantFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserTeanantFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserTeanant'> extends True ? Prisma__UserTeanantClient<UserTeanantGetPayload<T>> : Prisma__UserTeanantClient<UserTeanantGetPayload<T> | null, null>

    /**
     * Find the first UserTeanant that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTeanantFindFirstOrThrowArgs} args - Arguments to find a UserTeanant
     * @example
     * // Get one UserTeanant
     * const userTeanant = await prisma.userTeanant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserTeanantFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserTeanantFindFirstOrThrowArgs>
    ): Prisma__UserTeanantClient<UserTeanantGetPayload<T>>

    /**
     * Find zero or more UserTeanants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTeanantFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserTeanants
     * const userTeanants = await prisma.userTeanant.findMany()
     * 
     * // Get first 10 UserTeanants
     * const userTeanants = await prisma.userTeanant.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userTeanantWithUserIdOnly = await prisma.userTeanant.findMany({ select: { userId: true } })
     * 
    **/
    findMany<T extends UserTeanantFindManyArgs>(
      args?: SelectSubset<T, UserTeanantFindManyArgs>
    ): Prisma.PrismaPromise<Array<UserTeanantGetPayload<T>>>

    /**
     * Create a UserTeanant.
     * @param {UserTeanantCreateArgs} args - Arguments to create a UserTeanant.
     * @example
     * // Create one UserTeanant
     * const UserTeanant = await prisma.userTeanant.create({
     *   data: {
     *     // ... data to create a UserTeanant
     *   }
     * })
     * 
    **/
    create<T extends UserTeanantCreateArgs>(
      args: SelectSubset<T, UserTeanantCreateArgs>
    ): Prisma__UserTeanantClient<UserTeanantGetPayload<T>>

    /**
     * Create many UserTeanants.
     *     @param {UserTeanantCreateManyArgs} args - Arguments to create many UserTeanants.
     *     @example
     *     // Create many UserTeanants
     *     const userTeanant = await prisma.userTeanant.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserTeanantCreateManyArgs>(
      args?: SelectSubset<T, UserTeanantCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserTeanant.
     * @param {UserTeanantDeleteArgs} args - Arguments to delete one UserTeanant.
     * @example
     * // Delete one UserTeanant
     * const UserTeanant = await prisma.userTeanant.delete({
     *   where: {
     *     // ... filter to delete one UserTeanant
     *   }
     * })
     * 
    **/
    delete<T extends UserTeanantDeleteArgs>(
      args: SelectSubset<T, UserTeanantDeleteArgs>
    ): Prisma__UserTeanantClient<UserTeanantGetPayload<T>>

    /**
     * Update one UserTeanant.
     * @param {UserTeanantUpdateArgs} args - Arguments to update one UserTeanant.
     * @example
     * // Update one UserTeanant
     * const userTeanant = await prisma.userTeanant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserTeanantUpdateArgs>(
      args: SelectSubset<T, UserTeanantUpdateArgs>
    ): Prisma__UserTeanantClient<UserTeanantGetPayload<T>>

    /**
     * Delete zero or more UserTeanants.
     * @param {UserTeanantDeleteManyArgs} args - Arguments to filter UserTeanants to delete.
     * @example
     * // Delete a few UserTeanants
     * const { count } = await prisma.userTeanant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserTeanantDeleteManyArgs>(
      args?: SelectSubset<T, UserTeanantDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserTeanants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTeanantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserTeanants
     * const userTeanant = await prisma.userTeanant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserTeanantUpdateManyArgs>(
      args: SelectSubset<T, UserTeanantUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserTeanant.
     * @param {UserTeanantUpsertArgs} args - Arguments to update or create a UserTeanant.
     * @example
     * // Update or create a UserTeanant
     * const userTeanant = await prisma.userTeanant.upsert({
     *   create: {
     *     // ... data to create a UserTeanant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserTeanant we want to update
     *   }
     * })
    **/
    upsert<T extends UserTeanantUpsertArgs>(
      args: SelectSubset<T, UserTeanantUpsertArgs>
    ): Prisma__UserTeanantClient<UserTeanantGetPayload<T>>

    /**
     * Count the number of UserTeanants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTeanantCountArgs} args - Arguments to filter UserTeanants to count.
     * @example
     * // Count the number of UserTeanants
     * const count = await prisma.userTeanant.count({
     *   where: {
     *     // ... the filter for the UserTeanants we want to count
     *   }
     * })
    **/
    count<T extends UserTeanantCountArgs>(
      args?: Subset<T, UserTeanantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserTeanantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserTeanant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTeanantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserTeanantAggregateArgs>(args: Subset<T, UserTeanantAggregateArgs>): Prisma.PrismaPromise<GetUserTeanantAggregateType<T>>

    /**
     * Group by UserTeanant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTeanantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserTeanantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserTeanantGroupByArgs['orderBy'] }
        : { orderBy?: UserTeanantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserTeanantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserTeanantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserTeanant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserTeanantClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    tenant<T extends TenantArgs= {}>(args?: Subset<T, TenantArgs>): Prisma__TenantClient<TenantGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * UserTeanant base type for findUnique actions
   */
  export type UserTeanantFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    /**
     * Filter, which UserTeanant to fetch.
     */
    where: UserTeanantWhereUniqueInput
  }

  /**
   * UserTeanant findUnique
   */
  export interface UserTeanantFindUniqueArgs extends UserTeanantFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserTeanant findUniqueOrThrow
   */
  export type UserTeanantFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    /**
     * Filter, which UserTeanant to fetch.
     */
    where: UserTeanantWhereUniqueInput
  }


  /**
   * UserTeanant base type for findFirst actions
   */
  export type UserTeanantFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    /**
     * Filter, which UserTeanant to fetch.
     */
    where?: UserTeanantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTeanants to fetch.
     */
    orderBy?: Enumerable<UserTeanantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTeanants.
     */
    cursor?: UserTeanantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTeanants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTeanants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTeanants.
     */
    distinct?: Enumerable<UserTeanantScalarFieldEnum>
  }

  /**
   * UserTeanant findFirst
   */
  export interface UserTeanantFindFirstArgs extends UserTeanantFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserTeanant findFirstOrThrow
   */
  export type UserTeanantFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    /**
     * Filter, which UserTeanant to fetch.
     */
    where?: UserTeanantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTeanants to fetch.
     */
    orderBy?: Enumerable<UserTeanantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTeanants.
     */
    cursor?: UserTeanantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTeanants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTeanants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTeanants.
     */
    distinct?: Enumerable<UserTeanantScalarFieldEnum>
  }


  /**
   * UserTeanant findMany
   */
  export type UserTeanantFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    /**
     * Filter, which UserTeanants to fetch.
     */
    where?: UserTeanantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTeanants to fetch.
     */
    orderBy?: Enumerable<UserTeanantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserTeanants.
     */
    cursor?: UserTeanantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTeanants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTeanants.
     */
    skip?: number
    distinct?: Enumerable<UserTeanantScalarFieldEnum>
  }


  /**
   * UserTeanant create
   */
  export type UserTeanantCreateArgs = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    /**
     * The data needed to create a UserTeanant.
     */
    data: XOR<UserTeanantCreateInput, UserTeanantUncheckedCreateInput>
  }


  /**
   * UserTeanant createMany
   */
  export type UserTeanantCreateManyArgs = {
    /**
     * The data used to create many UserTeanants.
     */
    data: Enumerable<UserTeanantCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserTeanant update
   */
  export type UserTeanantUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    /**
     * The data needed to update a UserTeanant.
     */
    data: XOR<UserTeanantUpdateInput, UserTeanantUncheckedUpdateInput>
    /**
     * Choose, which UserTeanant to update.
     */
    where: UserTeanantWhereUniqueInput
  }


  /**
   * UserTeanant updateMany
   */
  export type UserTeanantUpdateManyArgs = {
    /**
     * The data used to update UserTeanants.
     */
    data: XOR<UserTeanantUpdateManyMutationInput, UserTeanantUncheckedUpdateManyInput>
    /**
     * Filter which UserTeanants to update
     */
    where?: UserTeanantWhereInput
  }


  /**
   * UserTeanant upsert
   */
  export type UserTeanantUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    /**
     * The filter to search for the UserTeanant to update in case it exists.
     */
    where: UserTeanantWhereUniqueInput
    /**
     * In case the UserTeanant found by the `where` argument doesn't exist, create a new UserTeanant with this data.
     */
    create: XOR<UserTeanantCreateInput, UserTeanantUncheckedCreateInput>
    /**
     * In case the UserTeanant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserTeanantUpdateInput, UserTeanantUncheckedUpdateInput>
  }


  /**
   * UserTeanant delete
   */
  export type UserTeanantDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    /**
     * Filter which UserTeanant to delete.
     */
    where: UserTeanantWhereUniqueInput
  }


  /**
   * UserTeanant deleteMany
   */
  export type UserTeanantDeleteManyArgs = {
    /**
     * Filter which UserTeanants to delete
     */
    where?: UserTeanantWhereInput
  }


  /**
   * UserTeanant without action
   */
  export type UserTeanantArgs = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    tenants?: boolean | User$tenantsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    tenants?: boolean | User$tenantsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'tenants' ? Array < UserTeanantGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'tenants' ? Array < UserTeanantGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): Prisma.PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    tenants<T extends User$tenantsArgs= {}>(args?: Subset<T, User$tenantsArgs>): Prisma.PrismaPromise<Array<UserTeanantGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.tenants
   */
  export type User$tenantsArgs = {
    /**
     * Select specific fields to fetch from the UserTeanant
     */
    select?: UserTeanantSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserTeanantInclude | null
    where?: UserTeanantWhereInput
    orderBy?: Enumerable<UserTeanantOrderByWithRelationInput>
    cursor?: UserTeanantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserTeanantScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    parentId: 'parentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserTeanantScalarFieldEnum: {
    userId: 'userId',
    tenantId: 'tenantId',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserTeanantScalarFieldEnum = (typeof UserTeanantScalarFieldEnum)[keyof typeof UserTeanantScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: Enumerable<TenantWhereInput>
    OR?: Enumerable<TenantWhereInput>
    NOT?: Enumerable<TenantWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    parentId?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    parent?: XOR<TenantRelationFilter, TenantWhereInput> | null
    children?: TenantListRelationFilter
    users?: UserTeanantListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parent?: TenantOrderByWithRelationInput
    children?: TenantOrderByRelationAggregateInput
    users?: UserTeanantOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = {
    id?: number
  }

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _avg?: TenantAvgOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
    _sum?: TenantSumOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TenantScalarWhereWithAggregatesInput>
    OR?: Enumerable<TenantScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TenantScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    parentId?: IntNullableWithAggregatesFilter | number | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserTeanantWhereInput = {
    AND?: Enumerable<UserTeanantWhereInput>
    OR?: Enumerable<UserTeanantWhereInput>
    NOT?: Enumerable<UserTeanantWhereInput>
    userId?: IntFilter | number
    tenantId?: IntFilter | number
    role?: EnumRoleFilter | Role
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }

  export type UserTeanantOrderByWithRelationInput = {
    userId?: SortOrder
    tenantId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
  }

  export type UserTeanantWhereUniqueInput = {
    userId_tenantId?: UserTeanantUserIdTenantIdCompoundUniqueInput
  }

  export type UserTeanantOrderByWithAggregationInput = {
    userId?: SortOrder
    tenantId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserTeanantCountOrderByAggregateInput
    _avg?: UserTeanantAvgOrderByAggregateInput
    _max?: UserTeanantMaxOrderByAggregateInput
    _min?: UserTeanantMinOrderByAggregateInput
    _sum?: UserTeanantSumOrderByAggregateInput
  }

  export type UserTeanantScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserTeanantScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserTeanantScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserTeanantScalarWhereWithAggregatesInput>
    userId?: IntWithAggregatesFilter | number
    tenantId?: IntWithAggregatesFilter | number
    role?: EnumRoleWithAggregatesFilter | Role
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    tenants?: UserTeanantListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    tenants?: UserTeanantOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: number
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
  }

  export type TenantCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: TenantCreateNestedOneWithoutChildrenInput
    children?: TenantCreateNestedManyWithoutParentInput
    users?: UserTeanantCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: number
    name: string
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: TenantUncheckedCreateNestedManyWithoutParentInput
    users?: UserTeanantUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: TenantUpdateOneWithoutChildrenNestedInput
    children?: TenantUpdateManyWithoutParentNestedInput
    users?: UserTeanantUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: TenantUncheckedUpdateManyWithoutParentNestedInput
    users?: UserTeanantUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: number
    name: string
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTeanantCreateInput = {
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTenantsInput
    tenant: TenantCreateNestedOneWithoutUsersInput
  }

  export type UserTeanantUncheckedCreateInput = {
    userId: number
    tenantId: number
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTeanantUpdateInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTenantsNestedInput
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserTeanantUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    tenantId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTeanantCreateManyInput = {
    userId: number
    tenantId: number
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTeanantUpdateManyMutationInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTeanantUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    tenantId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    tenants?: UserTeanantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    tenants?: UserTeanantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    tenants?: UserTeanantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tenants?: UserTeanantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
  }

  export type UserUpdateManyMutationInput = {

  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type TenantRelationFilter = {
    is?: TenantWhereInput | null
    isNot?: TenantWhereInput | null
  }

  export type TenantListRelationFilter = {
    every?: TenantWhereInput
    some?: TenantWhereInput
    none?: TenantWhereInput
  }

  export type UserTeanantListRelationFilter = {
    every?: UserTeanantWhereInput
    some?: UserTeanantWhereInput
    none?: UserTeanantWhereInput
  }

  export type TenantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserTeanantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantAvgOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantSumOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type EnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserTeanantUserIdTenantIdCompoundUniqueInput = {
    userId: number
    tenantId: number
  }

  export type UserTeanantCountOrderByAggregateInput = {
    userId?: SortOrder
    tenantId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserTeanantAvgOrderByAggregateInput = {
    userId?: SortOrder
    tenantId?: SortOrder
  }

  export type UserTeanantMaxOrderByAggregateInput = {
    userId?: SortOrder
    tenantId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserTeanantMinOrderByAggregateInput = {
    userId?: SortOrder
    tenantId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserTeanantSumOrderByAggregateInput = {
    userId?: SortOrder
    tenantId?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TenantCreateNestedOneWithoutChildrenInput = {
    create?: XOR<TenantCreateWithoutChildrenInput, TenantUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: TenantCreateOrConnectWithoutChildrenInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantCreateNestedManyWithoutParentInput = {
    create?: XOR<Enumerable<TenantCreateWithoutParentInput>, Enumerable<TenantUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<TenantCreateOrConnectWithoutParentInput>
    createMany?: TenantCreateManyParentInputEnvelope
    connect?: Enumerable<TenantWhereUniqueInput>
  }

  export type UserTeanantCreateNestedManyWithoutTenantInput = {
    create?: XOR<Enumerable<UserTeanantCreateWithoutTenantInput>, Enumerable<UserTeanantUncheckedCreateWithoutTenantInput>>
    connectOrCreate?: Enumerable<UserTeanantCreateOrConnectWithoutTenantInput>
    createMany?: UserTeanantCreateManyTenantInputEnvelope
    connect?: Enumerable<UserTeanantWhereUniqueInput>
  }

  export type TenantUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<Enumerable<TenantCreateWithoutParentInput>, Enumerable<TenantUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<TenantCreateOrConnectWithoutParentInput>
    createMany?: TenantCreateManyParentInputEnvelope
    connect?: Enumerable<TenantWhereUniqueInput>
  }

  export type UserTeanantUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<Enumerable<UserTeanantCreateWithoutTenantInput>, Enumerable<UserTeanantUncheckedCreateWithoutTenantInput>>
    connectOrCreate?: Enumerable<UserTeanantCreateOrConnectWithoutTenantInput>
    createMany?: UserTeanantCreateManyTenantInputEnvelope
    connect?: Enumerable<UserTeanantWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TenantUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<TenantCreateWithoutChildrenInput, TenantUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: TenantCreateOrConnectWithoutChildrenInput
    upsert?: TenantUpsertWithoutChildrenInput
    disconnect?: boolean
    delete?: boolean
    connect?: TenantWhereUniqueInput
    update?: XOR<TenantUpdateWithoutChildrenInput, TenantUncheckedUpdateWithoutChildrenInput>
  }

  export type TenantUpdateManyWithoutParentNestedInput = {
    create?: XOR<Enumerable<TenantCreateWithoutParentInput>, Enumerable<TenantUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<TenantCreateOrConnectWithoutParentInput>
    upsert?: Enumerable<TenantUpsertWithWhereUniqueWithoutParentInput>
    createMany?: TenantCreateManyParentInputEnvelope
    set?: Enumerable<TenantWhereUniqueInput>
    disconnect?: Enumerable<TenantWhereUniqueInput>
    delete?: Enumerable<TenantWhereUniqueInput>
    connect?: Enumerable<TenantWhereUniqueInput>
    update?: Enumerable<TenantUpdateWithWhereUniqueWithoutParentInput>
    updateMany?: Enumerable<TenantUpdateManyWithWhereWithoutParentInput>
    deleteMany?: Enumerable<TenantScalarWhereInput>
  }

  export type UserTeanantUpdateManyWithoutTenantNestedInput = {
    create?: XOR<Enumerable<UserTeanantCreateWithoutTenantInput>, Enumerable<UserTeanantUncheckedCreateWithoutTenantInput>>
    connectOrCreate?: Enumerable<UserTeanantCreateOrConnectWithoutTenantInput>
    upsert?: Enumerable<UserTeanantUpsertWithWhereUniqueWithoutTenantInput>
    createMany?: UserTeanantCreateManyTenantInputEnvelope
    set?: Enumerable<UserTeanantWhereUniqueInput>
    disconnect?: Enumerable<UserTeanantWhereUniqueInput>
    delete?: Enumerable<UserTeanantWhereUniqueInput>
    connect?: Enumerable<UserTeanantWhereUniqueInput>
    update?: Enumerable<UserTeanantUpdateWithWhereUniqueWithoutTenantInput>
    updateMany?: Enumerable<UserTeanantUpdateManyWithWhereWithoutTenantInput>
    deleteMany?: Enumerable<UserTeanantScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TenantUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<Enumerable<TenantCreateWithoutParentInput>, Enumerable<TenantUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<TenantCreateOrConnectWithoutParentInput>
    upsert?: Enumerable<TenantUpsertWithWhereUniqueWithoutParentInput>
    createMany?: TenantCreateManyParentInputEnvelope
    set?: Enumerable<TenantWhereUniqueInput>
    disconnect?: Enumerable<TenantWhereUniqueInput>
    delete?: Enumerable<TenantWhereUniqueInput>
    connect?: Enumerable<TenantWhereUniqueInput>
    update?: Enumerable<TenantUpdateWithWhereUniqueWithoutParentInput>
    updateMany?: Enumerable<TenantUpdateManyWithWhereWithoutParentInput>
    deleteMany?: Enumerable<TenantScalarWhereInput>
  }

  export type UserTeanantUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<Enumerable<UserTeanantCreateWithoutTenantInput>, Enumerable<UserTeanantUncheckedCreateWithoutTenantInput>>
    connectOrCreate?: Enumerable<UserTeanantCreateOrConnectWithoutTenantInput>
    upsert?: Enumerable<UserTeanantUpsertWithWhereUniqueWithoutTenantInput>
    createMany?: UserTeanantCreateManyTenantInputEnvelope
    set?: Enumerable<UserTeanantWhereUniqueInput>
    disconnect?: Enumerable<UserTeanantWhereUniqueInput>
    delete?: Enumerable<UserTeanantWhereUniqueInput>
    connect?: Enumerable<UserTeanantWhereUniqueInput>
    update?: Enumerable<UserTeanantUpdateWithWhereUniqueWithoutTenantInput>
    updateMany?: Enumerable<UserTeanantUpdateManyWithWhereWithoutTenantInput>
    deleteMany?: Enumerable<UserTeanantScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutTenantsInput = {
    create?: XOR<UserCreateWithoutTenantsInput, UserUncheckedCreateWithoutTenantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTenantsInput
    connect?: UserWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutUsersInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput
    connect?: TenantWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: Role
  }

  export type UserUpdateOneRequiredWithoutTenantsNestedInput = {
    create?: XOR<UserCreateWithoutTenantsInput, UserUncheckedCreateWithoutTenantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTenantsInput
    upsert?: UserUpsertWithoutTenantsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutTenantsInput, UserUncheckedUpdateWithoutTenantsInput>
  }

  export type TenantUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput
    upsert?: TenantUpsertWithoutUsersInput
    connect?: TenantWhereUniqueInput
    update?: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>
  }

  export type UserTeanantCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserTeanantCreateWithoutUserInput>, Enumerable<UserTeanantUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserTeanantCreateOrConnectWithoutUserInput>
    createMany?: UserTeanantCreateManyUserInputEnvelope
    connect?: Enumerable<UserTeanantWhereUniqueInput>
  }

  export type UserTeanantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserTeanantCreateWithoutUserInput>, Enumerable<UserTeanantUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserTeanantCreateOrConnectWithoutUserInput>
    createMany?: UserTeanantCreateManyUserInputEnvelope
    connect?: Enumerable<UserTeanantWhereUniqueInput>
  }

  export type UserTeanantUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<UserTeanantCreateWithoutUserInput>, Enumerable<UserTeanantUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserTeanantCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<UserTeanantUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserTeanantCreateManyUserInputEnvelope
    set?: Enumerable<UserTeanantWhereUniqueInput>
    disconnect?: Enumerable<UserTeanantWhereUniqueInput>
    delete?: Enumerable<UserTeanantWhereUniqueInput>
    connect?: Enumerable<UserTeanantWhereUniqueInput>
    update?: Enumerable<UserTeanantUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserTeanantUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserTeanantScalarWhereInput>
  }

  export type UserTeanantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<UserTeanantCreateWithoutUserInput>, Enumerable<UserTeanantUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserTeanantCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<UserTeanantUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserTeanantCreateManyUserInputEnvelope
    set?: Enumerable<UserTeanantWhereUniqueInput>
    disconnect?: Enumerable<UserTeanantWhereUniqueInput>
    delete?: Enumerable<UserTeanantWhereUniqueInput>
    connect?: Enumerable<UserTeanantWhereUniqueInput>
    update?: Enumerable<UserTeanantUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserTeanantUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserTeanantScalarWhereInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedEnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type NestedEnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type TenantCreateWithoutChildrenInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: TenantCreateNestedOneWithoutChildrenInput
    users?: UserTeanantCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutChildrenInput = {
    id?: number
    name: string
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserTeanantUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutChildrenInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutChildrenInput, TenantUncheckedCreateWithoutChildrenInput>
  }

  export type TenantCreateWithoutParentInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: TenantCreateNestedManyWithoutParentInput
    users?: UserTeanantCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutParentInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: TenantUncheckedCreateNestedManyWithoutParentInput
    users?: UserTeanantUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutParentInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutParentInput, TenantUncheckedCreateWithoutParentInput>
  }

  export type TenantCreateManyParentInputEnvelope = {
    data: Enumerable<TenantCreateManyParentInput>
    skipDuplicates?: boolean
  }

  export type UserTeanantCreateWithoutTenantInput = {
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTenantsInput
  }

  export type UserTeanantUncheckedCreateWithoutTenantInput = {
    userId: number
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTeanantCreateOrConnectWithoutTenantInput = {
    where: UserTeanantWhereUniqueInput
    create: XOR<UserTeanantCreateWithoutTenantInput, UserTeanantUncheckedCreateWithoutTenantInput>
  }

  export type UserTeanantCreateManyTenantInputEnvelope = {
    data: Enumerable<UserTeanantCreateManyTenantInput>
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutChildrenInput = {
    update: XOR<TenantUpdateWithoutChildrenInput, TenantUncheckedUpdateWithoutChildrenInput>
    create: XOR<TenantCreateWithoutChildrenInput, TenantUncheckedCreateWithoutChildrenInput>
  }

  export type TenantUpdateWithoutChildrenInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: TenantUpdateOneWithoutChildrenNestedInput
    users?: UserTeanantUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserTeanantUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantUpsertWithWhereUniqueWithoutParentInput = {
    where: TenantWhereUniqueInput
    update: XOR<TenantUpdateWithoutParentInput, TenantUncheckedUpdateWithoutParentInput>
    create: XOR<TenantCreateWithoutParentInput, TenantUncheckedCreateWithoutParentInput>
  }

  export type TenantUpdateWithWhereUniqueWithoutParentInput = {
    where: TenantWhereUniqueInput
    data: XOR<TenantUpdateWithoutParentInput, TenantUncheckedUpdateWithoutParentInput>
  }

  export type TenantUpdateManyWithWhereWithoutParentInput = {
    where: TenantScalarWhereInput
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyWithoutChildrenInput>
  }

  export type TenantScalarWhereInput = {
    AND?: Enumerable<TenantScalarWhereInput>
    OR?: Enumerable<TenantScalarWhereInput>
    NOT?: Enumerable<TenantScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    parentId?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserTeanantUpsertWithWhereUniqueWithoutTenantInput = {
    where: UserTeanantWhereUniqueInput
    update: XOR<UserTeanantUpdateWithoutTenantInput, UserTeanantUncheckedUpdateWithoutTenantInput>
    create: XOR<UserTeanantCreateWithoutTenantInput, UserTeanantUncheckedCreateWithoutTenantInput>
  }

  export type UserTeanantUpdateWithWhereUniqueWithoutTenantInput = {
    where: UserTeanantWhereUniqueInput
    data: XOR<UserTeanantUpdateWithoutTenantInput, UserTeanantUncheckedUpdateWithoutTenantInput>
  }

  export type UserTeanantUpdateManyWithWhereWithoutTenantInput = {
    where: UserTeanantScalarWhereInput
    data: XOR<UserTeanantUpdateManyMutationInput, UserTeanantUncheckedUpdateManyWithoutUsersInput>
  }

  export type UserTeanantScalarWhereInput = {
    AND?: Enumerable<UserTeanantScalarWhereInput>
    OR?: Enumerable<UserTeanantScalarWhereInput>
    NOT?: Enumerable<UserTeanantScalarWhereInput>
    userId?: IntFilter | number
    tenantId?: IntFilter | number
    role?: EnumRoleFilter | Role
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserCreateWithoutTenantsInput = {

  }

  export type UserUncheckedCreateWithoutTenantsInput = {
    id?: number
  }

  export type UserCreateOrConnectWithoutTenantsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTenantsInput, UserUncheckedCreateWithoutTenantsInput>
  }

  export type TenantCreateWithoutUsersInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: TenantCreateNestedOneWithoutChildrenInput
    children?: TenantCreateNestedManyWithoutParentInput
  }

  export type TenantUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: TenantUncheckedCreateNestedManyWithoutParentInput
  }

  export type TenantCreateOrConnectWithoutUsersInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutTenantsInput = {
    update: XOR<UserUpdateWithoutTenantsInput, UserUncheckedUpdateWithoutTenantsInput>
    create: XOR<UserCreateWithoutTenantsInput, UserUncheckedCreateWithoutTenantsInput>
  }

  export type UserUpdateWithoutTenantsInput = {

  }

  export type UserUncheckedUpdateWithoutTenantsInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type TenantUpsertWithoutUsersInput = {
    update: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
  }

  export type TenantUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: TenantUpdateOneWithoutChildrenNestedInput
    children?: TenantUpdateManyWithoutParentNestedInput
  }

  export type TenantUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: TenantUncheckedUpdateManyWithoutParentNestedInput
  }

  export type UserTeanantCreateWithoutUserInput = {
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutUsersInput
  }

  export type UserTeanantUncheckedCreateWithoutUserInput = {
    tenantId: number
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTeanantCreateOrConnectWithoutUserInput = {
    where: UserTeanantWhereUniqueInput
    create: XOR<UserTeanantCreateWithoutUserInput, UserTeanantUncheckedCreateWithoutUserInput>
  }

  export type UserTeanantCreateManyUserInputEnvelope = {
    data: Enumerable<UserTeanantCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type UserTeanantUpsertWithWhereUniqueWithoutUserInput = {
    where: UserTeanantWhereUniqueInput
    update: XOR<UserTeanantUpdateWithoutUserInput, UserTeanantUncheckedUpdateWithoutUserInput>
    create: XOR<UserTeanantCreateWithoutUserInput, UserTeanantUncheckedCreateWithoutUserInput>
  }

  export type UserTeanantUpdateWithWhereUniqueWithoutUserInput = {
    where: UserTeanantWhereUniqueInput
    data: XOR<UserTeanantUpdateWithoutUserInput, UserTeanantUncheckedUpdateWithoutUserInput>
  }

  export type UserTeanantUpdateManyWithWhereWithoutUserInput = {
    where: UserTeanantScalarWhereInput
    data: XOR<UserTeanantUpdateManyMutationInput, UserTeanantUncheckedUpdateManyWithoutTenantsInput>
  }

  export type TenantCreateManyParentInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTeanantCreateManyTenantInput = {
    userId: number
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateWithoutParentInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: TenantUpdateManyWithoutParentNestedInput
    users?: UserTeanantUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: TenantUncheckedUpdateManyWithoutParentNestedInput
    users?: UserTeanantUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateManyWithoutChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTeanantUpdateWithoutTenantInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTenantsNestedInput
  }

  export type UserTeanantUncheckedUpdateWithoutTenantInput = {
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTeanantUncheckedUpdateManyWithoutUsersInput = {
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTeanantCreateManyUserInput = {
    tenantId: number
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTeanantUpdateWithoutUserInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserTeanantUncheckedUpdateWithoutUserInput = {
    tenantId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTeanantUncheckedUpdateManyWithoutTenantsInput = {
    tenantId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}

/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model AdminSettings
 * 
 */
export type AdminSettings = $Result.DefaultSelection<Prisma.$AdminSettingsPayload>
/**
 * Model Properti
 * 
 */
export type Properti = $Result.DefaultSelection<Prisma.$PropertiPayload>
/**
 * Model Kamar
 * 
 */
export type Kamar = $Result.DefaultSelection<Prisma.$KamarPayload>
/**
 * Model Pemesanan
 * 
 */
export type Pemesanan = $Result.DefaultSelection<Prisma.$PemesananPayload>
/**
 * Model Pembayaran
 * 
 */
export type Pembayaran = $Result.DefaultSelection<Prisma.$PembayaranPayload>
/**
 * Model Penghuni
 * 
 */
export type Penghuni = $Result.DefaultSelection<Prisma.$PenghuniPayload>
/**
 * Model Operator
 * 
 */
export type Operator = $Result.DefaultSelection<Prisma.$OperatorPayload>
/**
 * Model Komplain
 * 
 */
export type Komplain = $Result.DefaultSelection<Prisma.$KomplainPayload>
/**
 * Model PengajuanDana
 * 
 */
export type PengajuanDana = $Result.DefaultSelection<Prisma.$PengajuanDanaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  PEMILIK: 'PEMILIK',
  PENGELOLA: 'PENGELOLA',
  PENGHUNI: 'PENGHUNI'
};

export type Role = (typeof Role)[keyof typeof Role]


export const StatusKamar: {
  KOSONG: 'KOSONG',
  TERISI: 'TERISI',
  MAINTENANCE: 'MAINTENANCE'
};

export type StatusKamar = (typeof StatusKamar)[keyof typeof StatusKamar]


export const TipeKamar: {
  REGULER: 'REGULER',
  VIP: 'VIP',
  STUDIO: 'STUDIO'
};

export type TipeKamar = (typeof TipeKamar)[keyof typeof TipeKamar]


export const JenisProperti: {
  LAKI_LAKI: 'LAKI_LAKI',
  PEREMPUAN: 'PEREMPUAN',
  CAMPUR: 'CAMPUR'
};

export type JenisProperti = (typeof JenisProperti)[keyof typeof JenisProperti]


export const StatusPemesanan: {
  MENUNGGU: 'MENUNGGU',
  DITERIMA: 'DITERIMA',
  DITOLAK: 'DITOLAK',
  SELESAI: 'SELESAI'
};

export type StatusPemesanan = (typeof StatusPemesanan)[keyof typeof StatusPemesanan]


export const StatusPembayaran: {
  MENUNGGU: 'MENUNGGU',
  DIVERIFIKASI: 'DIVERIFIKASI',
  DITERIMA: 'DITERIMA',
  DITOLAK: 'DITOLAK'
};

export type StatusPembayaran = (typeof StatusPembayaran)[keyof typeof StatusPembayaran]


export const StatusKomplain: {
  BARU: 'BARU',
  DIPROSES: 'DIPROSES',
  SELESAI: 'SELESAI'
};

export type StatusKomplain = (typeof StatusKomplain)[keyof typeof StatusKomplain]


export const JenisKomplain: {
  FASILITAS: 'FASILITAS',
  LINGKUNGAN: 'LINGKUNGAN',
  PENGHUNI_LAIN: 'PENGHUNI_LAIN',
  LAINNYA: 'LAINNYA'
};

export type JenisKomplain = (typeof JenisKomplain)[keyof typeof JenisKomplain]


export const StatusDana: {
  MENUNGGU: 'MENUNGGU',
  DITERIMA: 'DITERIMA',
  DITOLAK: 'DITOLAK'
};

export type StatusDana = (typeof StatusDana)[keyof typeof StatusDana]


export const StatusSewa: {
  AKTIF: 'AKTIF',
  BERAKHIR: 'BERAKHIR'
};

export type StatusSewa = (typeof StatusSewa)[keyof typeof StatusSewa]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type StatusKamar = $Enums.StatusKamar

export const StatusKamar: typeof $Enums.StatusKamar

export type TipeKamar = $Enums.TipeKamar

export const TipeKamar: typeof $Enums.TipeKamar

export type JenisProperti = $Enums.JenisProperti

export const JenisProperti: typeof $Enums.JenisProperti

export type StatusPemesanan = $Enums.StatusPemesanan

export const StatusPemesanan: typeof $Enums.StatusPemesanan

export type StatusPembayaran = $Enums.StatusPembayaran

export const StatusPembayaran: typeof $Enums.StatusPembayaran

export type StatusKomplain = $Enums.StatusKomplain

export const StatusKomplain: typeof $Enums.StatusKomplain

export type JenisKomplain = $Enums.JenisKomplain

export const JenisKomplain: typeof $Enums.JenisKomplain

export type StatusDana = $Enums.StatusDana

export const StatusDana: typeof $Enums.StatusDana

export type StatusSewa = $Enums.StatusSewa

export const StatusSewa: typeof $Enums.StatusSewa

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminSettings`: Exposes CRUD operations for the **AdminSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminSettings
    * const adminSettings = await prisma.adminSettings.findMany()
    * ```
    */
  get adminSettings(): Prisma.AdminSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.properti`: Exposes CRUD operations for the **Properti** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Propertis
    * const propertis = await prisma.properti.findMany()
    * ```
    */
  get properti(): Prisma.PropertiDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kamar`: Exposes CRUD operations for the **Kamar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kamars
    * const kamars = await prisma.kamar.findMany()
    * ```
    */
  get kamar(): Prisma.KamarDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pemesanan`: Exposes CRUD operations for the **Pemesanan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pemesanans
    * const pemesanans = await prisma.pemesanan.findMany()
    * ```
    */
  get pemesanan(): Prisma.PemesananDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pembayaran`: Exposes CRUD operations for the **Pembayaran** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pembayarans
    * const pembayarans = await prisma.pembayaran.findMany()
    * ```
    */
  get pembayaran(): Prisma.PembayaranDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.penghuni`: Exposes CRUD operations for the **Penghuni** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Penghunis
    * const penghunis = await prisma.penghuni.findMany()
    * ```
    */
  get penghuni(): Prisma.PenghuniDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.operator`: Exposes CRUD operations for the **Operator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Operators
    * const operators = await prisma.operator.findMany()
    * ```
    */
  get operator(): Prisma.OperatorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.komplain`: Exposes CRUD operations for the **Komplain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Komplains
    * const komplains = await prisma.komplain.findMany()
    * ```
    */
  get komplain(): Prisma.KomplainDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pengajuanDana`: Exposes CRUD operations for the **PengajuanDana** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PengajuanDanas
    * const pengajuanDanas = await prisma.pengajuanDana.findMany()
    * ```
    */
  get pengajuanDana(): Prisma.PengajuanDanaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    AdminSettings: 'AdminSettings',
    Properti: 'Properti',
    Kamar: 'Kamar',
    Pemesanan: 'Pemesanan',
    Pembayaran: 'Pembayaran',
    Penghuni: 'Penghuni',
    Operator: 'Operator',
    Komplain: 'Komplain',
    PengajuanDana: 'PengajuanDana'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "adminSettings" | "properti" | "kamar" | "pemesanan" | "pembayaran" | "penghuni" | "operator" | "komplain" | "pengajuanDana"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      AdminSettings: {
        payload: Prisma.$AdminSettingsPayload<ExtArgs>
        fields: Prisma.AdminSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          findFirst: {
            args: Prisma.AdminSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          findMany: {
            args: Prisma.AdminSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>[]
          }
          create: {
            args: Prisma.AdminSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          createMany: {
            args: Prisma.AdminSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>[]
          }
          delete: {
            args: Prisma.AdminSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          update: {
            args: Prisma.AdminSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          deleteMany: {
            args: Prisma.AdminSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>[]
          }
          upsert: {
            args: Prisma.AdminSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          aggregate: {
            args: Prisma.AdminSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminSettings>
          }
          groupBy: {
            args: Prisma.AdminSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<AdminSettingsCountAggregateOutputType> | number
          }
        }
      }
      Properti: {
        payload: Prisma.$PropertiPayload<ExtArgs>
        fields: Prisma.PropertiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload>
          }
          findFirst: {
            args: Prisma.PropertiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload>
          }
          findMany: {
            args: Prisma.PropertiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload>[]
          }
          create: {
            args: Prisma.PropertiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload>
          }
          createMany: {
            args: Prisma.PropertiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload>[]
          }
          delete: {
            args: Prisma.PropertiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload>
          }
          update: {
            args: Prisma.PropertiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload>
          }
          deleteMany: {
            args: Prisma.PropertiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertiUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload>[]
          }
          upsert: {
            args: Prisma.PropertiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertiPayload>
          }
          aggregate: {
            args: Prisma.PropertiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperti>
          }
          groupBy: {
            args: Prisma.PropertiGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertiGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertiCountArgs<ExtArgs>
            result: $Utils.Optional<PropertiCountAggregateOutputType> | number
          }
        }
      }
      Kamar: {
        payload: Prisma.$KamarPayload<ExtArgs>
        fields: Prisma.KamarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KamarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KamarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload>
          }
          findFirst: {
            args: Prisma.KamarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KamarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload>
          }
          findMany: {
            args: Prisma.KamarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload>[]
          }
          create: {
            args: Prisma.KamarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload>
          }
          createMany: {
            args: Prisma.KamarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KamarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload>[]
          }
          delete: {
            args: Prisma.KamarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload>
          }
          update: {
            args: Prisma.KamarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload>
          }
          deleteMany: {
            args: Prisma.KamarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KamarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KamarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload>[]
          }
          upsert: {
            args: Prisma.KamarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KamarPayload>
          }
          aggregate: {
            args: Prisma.KamarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKamar>
          }
          groupBy: {
            args: Prisma.KamarGroupByArgs<ExtArgs>
            result: $Utils.Optional<KamarGroupByOutputType>[]
          }
          count: {
            args: Prisma.KamarCountArgs<ExtArgs>
            result: $Utils.Optional<KamarCountAggregateOutputType> | number
          }
        }
      }
      Pemesanan: {
        payload: Prisma.$PemesananPayload<ExtArgs>
        fields: Prisma.PemesananFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PemesananFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PemesananFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload>
          }
          findFirst: {
            args: Prisma.PemesananFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PemesananFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload>
          }
          findMany: {
            args: Prisma.PemesananFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload>[]
          }
          create: {
            args: Prisma.PemesananCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload>
          }
          createMany: {
            args: Prisma.PemesananCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PemesananCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload>[]
          }
          delete: {
            args: Prisma.PemesananDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload>
          }
          update: {
            args: Prisma.PemesananUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload>
          }
          deleteMany: {
            args: Prisma.PemesananDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PemesananUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PemesananUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload>[]
          }
          upsert: {
            args: Prisma.PemesananUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PemesananPayload>
          }
          aggregate: {
            args: Prisma.PemesananAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePemesanan>
          }
          groupBy: {
            args: Prisma.PemesananGroupByArgs<ExtArgs>
            result: $Utils.Optional<PemesananGroupByOutputType>[]
          }
          count: {
            args: Prisma.PemesananCountArgs<ExtArgs>
            result: $Utils.Optional<PemesananCountAggregateOutputType> | number
          }
        }
      }
      Pembayaran: {
        payload: Prisma.$PembayaranPayload<ExtArgs>
        fields: Prisma.PembayaranFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PembayaranFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PembayaranFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          findFirst: {
            args: Prisma.PembayaranFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PembayaranFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          findMany: {
            args: Prisma.PembayaranFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>[]
          }
          create: {
            args: Prisma.PembayaranCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          createMany: {
            args: Prisma.PembayaranCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PembayaranCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>[]
          }
          delete: {
            args: Prisma.PembayaranDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          update: {
            args: Prisma.PembayaranUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          deleteMany: {
            args: Prisma.PembayaranDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PembayaranUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PembayaranUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>[]
          }
          upsert: {
            args: Prisma.PembayaranUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          aggregate: {
            args: Prisma.PembayaranAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePembayaran>
          }
          groupBy: {
            args: Prisma.PembayaranGroupByArgs<ExtArgs>
            result: $Utils.Optional<PembayaranGroupByOutputType>[]
          }
          count: {
            args: Prisma.PembayaranCountArgs<ExtArgs>
            result: $Utils.Optional<PembayaranCountAggregateOutputType> | number
          }
        }
      }
      Penghuni: {
        payload: Prisma.$PenghuniPayload<ExtArgs>
        fields: Prisma.PenghuniFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PenghuniFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PenghuniFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload>
          }
          findFirst: {
            args: Prisma.PenghuniFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PenghuniFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload>
          }
          findMany: {
            args: Prisma.PenghuniFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload>[]
          }
          create: {
            args: Prisma.PenghuniCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload>
          }
          createMany: {
            args: Prisma.PenghuniCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PenghuniCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload>[]
          }
          delete: {
            args: Prisma.PenghuniDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload>
          }
          update: {
            args: Prisma.PenghuniUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload>
          }
          deleteMany: {
            args: Prisma.PenghuniDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PenghuniUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PenghuniUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload>[]
          }
          upsert: {
            args: Prisma.PenghuniUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenghuniPayload>
          }
          aggregate: {
            args: Prisma.PenghuniAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePenghuni>
          }
          groupBy: {
            args: Prisma.PenghuniGroupByArgs<ExtArgs>
            result: $Utils.Optional<PenghuniGroupByOutputType>[]
          }
          count: {
            args: Prisma.PenghuniCountArgs<ExtArgs>
            result: $Utils.Optional<PenghuniCountAggregateOutputType> | number
          }
        }
      }
      Operator: {
        payload: Prisma.$OperatorPayload<ExtArgs>
        fields: Prisma.OperatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OperatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OperatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          findFirst: {
            args: Prisma.OperatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OperatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          findMany: {
            args: Prisma.OperatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>[]
          }
          create: {
            args: Prisma.OperatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          createMany: {
            args: Prisma.OperatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OperatorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>[]
          }
          delete: {
            args: Prisma.OperatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          update: {
            args: Prisma.OperatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          deleteMany: {
            args: Prisma.OperatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OperatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OperatorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>[]
          }
          upsert: {
            args: Prisma.OperatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          aggregate: {
            args: Prisma.OperatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOperator>
          }
          groupBy: {
            args: Prisma.OperatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<OperatorGroupByOutputType>[]
          }
          count: {
            args: Prisma.OperatorCountArgs<ExtArgs>
            result: $Utils.Optional<OperatorCountAggregateOutputType> | number
          }
        }
      }
      Komplain: {
        payload: Prisma.$KomplainPayload<ExtArgs>
        fields: Prisma.KomplainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KomplainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KomplainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload>
          }
          findFirst: {
            args: Prisma.KomplainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KomplainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload>
          }
          findMany: {
            args: Prisma.KomplainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload>[]
          }
          create: {
            args: Prisma.KomplainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload>
          }
          createMany: {
            args: Prisma.KomplainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KomplainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload>[]
          }
          delete: {
            args: Prisma.KomplainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload>
          }
          update: {
            args: Prisma.KomplainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload>
          }
          deleteMany: {
            args: Prisma.KomplainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KomplainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KomplainUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload>[]
          }
          upsert: {
            args: Prisma.KomplainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomplainPayload>
          }
          aggregate: {
            args: Prisma.KomplainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKomplain>
          }
          groupBy: {
            args: Prisma.KomplainGroupByArgs<ExtArgs>
            result: $Utils.Optional<KomplainGroupByOutputType>[]
          }
          count: {
            args: Prisma.KomplainCountArgs<ExtArgs>
            result: $Utils.Optional<KomplainCountAggregateOutputType> | number
          }
        }
      }
      PengajuanDana: {
        payload: Prisma.$PengajuanDanaPayload<ExtArgs>
        fields: Prisma.PengajuanDanaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PengajuanDanaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PengajuanDanaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload>
          }
          findFirst: {
            args: Prisma.PengajuanDanaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PengajuanDanaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload>
          }
          findMany: {
            args: Prisma.PengajuanDanaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload>[]
          }
          create: {
            args: Prisma.PengajuanDanaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload>
          }
          createMany: {
            args: Prisma.PengajuanDanaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PengajuanDanaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload>[]
          }
          delete: {
            args: Prisma.PengajuanDanaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload>
          }
          update: {
            args: Prisma.PengajuanDanaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload>
          }
          deleteMany: {
            args: Prisma.PengajuanDanaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PengajuanDanaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PengajuanDanaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload>[]
          }
          upsert: {
            args: Prisma.PengajuanDanaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanDanaPayload>
          }
          aggregate: {
            args: Prisma.PengajuanDanaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePengajuanDana>
          }
          groupBy: {
            args: Prisma.PengajuanDanaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PengajuanDanaGroupByOutputType>[]
          }
          count: {
            args: Prisma.PengajuanDanaCountArgs<ExtArgs>
            result: $Utils.Optional<PengajuanDanaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    adminSettings?: AdminSettingsOmit
    properti?: PropertiOmit
    kamar?: KamarOmit
    pemesanan?: PemesananOmit
    pembayaran?: PembayaranOmit
    penghuni?: PenghuniOmit
    operator?: OperatorOmit
    komplain?: KomplainOmit
    pengajuanDana?: PengajuanDanaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    properti: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properti?: boolean | UserCountOutputTypeCountPropertiArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPropertiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertiWhereInput
  }


  /**
   * Count Type PropertiCountOutputType
   */

  export type PropertiCountOutputType = {
    kamar: number
    komplain: number
    operator: number
    pemesanan: number
    pengajuanDana: number
  }

  export type PropertiCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kamar?: boolean | PropertiCountOutputTypeCountKamarArgs
    komplain?: boolean | PropertiCountOutputTypeCountKomplainArgs
    operator?: boolean | PropertiCountOutputTypeCountOperatorArgs
    pemesanan?: boolean | PropertiCountOutputTypeCountPemesananArgs
    pengajuanDana?: boolean | PropertiCountOutputTypeCountPengajuanDanaArgs
  }

  // Custom InputTypes
  /**
   * PropertiCountOutputType without action
   */
  export type PropertiCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertiCountOutputType
     */
    select?: PropertiCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertiCountOutputType without action
   */
  export type PropertiCountOutputTypeCountKamarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KamarWhereInput
  }

  /**
   * PropertiCountOutputType without action
   */
  export type PropertiCountOutputTypeCountKomplainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KomplainWhereInput
  }

  /**
   * PropertiCountOutputType without action
   */
  export type PropertiCountOutputTypeCountOperatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperatorWhereInput
  }

  /**
   * PropertiCountOutputType without action
   */
  export type PropertiCountOutputTypeCountPemesananArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PemesananWhereInput
  }

  /**
   * PropertiCountOutputType without action
   */
  export type PropertiCountOutputTypeCountPengajuanDanaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PengajuanDanaWhereInput
  }


  /**
   * Count Type KamarCountOutputType
   */

  export type KamarCountOutputType = {
    pemesanan: number
  }

  export type KamarCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pemesanan?: boolean | KamarCountOutputTypeCountPemesananArgs
  }

  // Custom InputTypes
  /**
   * KamarCountOutputType without action
   */
  export type KamarCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KamarCountOutputType
     */
    select?: KamarCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KamarCountOutputType without action
   */
  export type KamarCountOutputTypeCountPemesananArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PemesananWhereInput
  }


  /**
   * Count Type PenghuniCountOutputType
   */

  export type PenghuniCountOutputType = {
    pemesanan: number
    komplain: number
  }

  export type PenghuniCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pemesanan?: boolean | PenghuniCountOutputTypeCountPemesananArgs
    komplain?: boolean | PenghuniCountOutputTypeCountKomplainArgs
  }

  // Custom InputTypes
  /**
   * PenghuniCountOutputType without action
   */
  export type PenghuniCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenghuniCountOutputType
     */
    select?: PenghuniCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PenghuniCountOutputType without action
   */
  export type PenghuniCountOutputTypeCountPemesananArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PemesananWhereInput
  }

  /**
   * PenghuniCountOutputType without action
   */
  export type PenghuniCountOutputTypeCountKomplainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KomplainWhereInput
  }


  /**
   * Count Type OperatorCountOutputType
   */

  export type OperatorCountOutputType = {
    pengajuanDana: number
  }

  export type OperatorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pengajuanDana?: boolean | OperatorCountOutputTypeCountPengajuanDanaArgs
  }

  // Custom InputTypes
  /**
   * OperatorCountOutputType without action
   */
  export type OperatorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperatorCountOutputType
     */
    select?: OperatorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OperatorCountOutputType without action
   */
  export type OperatorCountOutputTypeCountPengajuanDanaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PengajuanDanaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    nama: string | null
    role: $Enums.Role | null
    no_telepon: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    nama: string | null
    role: $Enums.Role | null
    no_telepon: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    nama: number
    role: number
    no_telepon: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    nama?: true
    role?: true
    no_telepon?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    nama?: true
    role?: true
    no_telepon?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    nama?: true
    role?: true
    no_telepon?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon: string | null
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    nama?: boolean
    role?: boolean
    no_telepon?: boolean
    created_at?: boolean
    updated_at?: boolean
    penghuni?: boolean | User$penghuniArgs<ExtArgs>
    operator?: boolean | User$operatorArgs<ExtArgs>
    properti?: boolean | User$propertiArgs<ExtArgs>
    settings?: boolean | User$settingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    nama?: boolean
    role?: boolean
    no_telepon?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    nama?: boolean
    role?: boolean
    no_telepon?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    nama?: boolean
    role?: boolean
    no_telepon?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "nama" | "role" | "no_telepon" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    penghuni?: boolean | User$penghuniArgs<ExtArgs>
    operator?: boolean | User$operatorArgs<ExtArgs>
    properti?: boolean | User$propertiArgs<ExtArgs>
    settings?: boolean | User$settingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      penghuni: Prisma.$PenghuniPayload<ExtArgs> | null
      operator: Prisma.$OperatorPayload<ExtArgs> | null
      properti: Prisma.$PropertiPayload<ExtArgs>[]
      settings: Prisma.$AdminSettingsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      nama: string
      role: $Enums.Role
      no_telepon: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
      T extends $Utils.Record<'select', any>
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
      ByFields extends MaybeTupleToUnion<T['by']>,
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
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    penghuni<T extends User$penghuniArgs<ExtArgs> = {}>(args?: Subset<T, User$penghuniArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    operator<T extends User$operatorArgs<ExtArgs> = {}>(args?: Subset<T, User$operatorArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    properti<T extends User$propertiArgs<ExtArgs> = {}>(args?: Subset<T, User$propertiArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    settings<T extends User$settingsArgs<ExtArgs> = {}>(args?: Subset<T, User$settingsArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly nama: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly no_telepon: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.penghuni
   */
  export type User$penghuniArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    where?: PenghuniWhereInput
  }

  /**
   * User.operator
   */
  export type User$operatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    where?: OperatorWhereInput
  }

  /**
   * User.properti
   */
  export type User$propertiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
    where?: PropertiWhereInput
    orderBy?: PropertiOrderByWithRelationInput | PropertiOrderByWithRelationInput[]
    cursor?: PropertiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertiScalarFieldEnum | PropertiScalarFieldEnum[]
  }

  /**
   * User.settings
   */
  export type User$settingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
    where?: AdminSettingsWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model AdminSettings
   */

  export type AggregateAdminSettings = {
    _count: AdminSettingsCountAggregateOutputType | null
    _min: AdminSettingsMinAggregateOutputType | null
    _max: AdminSettingsMaxAggregateOutputType | null
  }

  export type AdminSettingsMinAggregateOutputType = {
    id: string | null
    nama_rekening: string | null
    nomor_rekening: string | null
    bank: string | null
    qris_image: string | null
    updated_at: Date | null
    user_id: string | null
  }

  export type AdminSettingsMaxAggregateOutputType = {
    id: string | null
    nama_rekening: string | null
    nomor_rekening: string | null
    bank: string | null
    qris_image: string | null
    updated_at: Date | null
    user_id: string | null
  }

  export type AdminSettingsCountAggregateOutputType = {
    id: number
    nama_rekening: number
    nomor_rekening: number
    bank: number
    qris_image: number
    updated_at: number
    user_id: number
    _all: number
  }


  export type AdminSettingsMinAggregateInputType = {
    id?: true
    nama_rekening?: true
    nomor_rekening?: true
    bank?: true
    qris_image?: true
    updated_at?: true
    user_id?: true
  }

  export type AdminSettingsMaxAggregateInputType = {
    id?: true
    nama_rekening?: true
    nomor_rekening?: true
    bank?: true
    qris_image?: true
    updated_at?: true
    user_id?: true
  }

  export type AdminSettingsCountAggregateInputType = {
    id?: true
    nama_rekening?: true
    nomor_rekening?: true
    bank?: true
    qris_image?: true
    updated_at?: true
    user_id?: true
    _all?: true
  }

  export type AdminSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminSettings to aggregate.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminSettings
    **/
    _count?: true | AdminSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminSettingsMaxAggregateInputType
  }

  export type GetAdminSettingsAggregateType<T extends AdminSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminSettings[P]>
      : GetScalarType<T[P], AggregateAdminSettings[P]>
  }




  export type AdminSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminSettingsWhereInput
    orderBy?: AdminSettingsOrderByWithAggregationInput | AdminSettingsOrderByWithAggregationInput[]
    by: AdminSettingsScalarFieldEnum[] | AdminSettingsScalarFieldEnum
    having?: AdminSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminSettingsCountAggregateInputType | true
    _min?: AdminSettingsMinAggregateInputType
    _max?: AdminSettingsMaxAggregateInputType
  }

  export type AdminSettingsGroupByOutputType = {
    id: string
    nama_rekening: string | null
    nomor_rekening: string | null
    bank: string | null
    qris_image: string | null
    updated_at: Date
    user_id: string
    _count: AdminSettingsCountAggregateOutputType | null
    _min: AdminSettingsMinAggregateOutputType | null
    _max: AdminSettingsMaxAggregateOutputType | null
  }

  type GetAdminSettingsGroupByPayload<T extends AdminSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], AdminSettingsGroupByOutputType[P]>
        }
      >
    >


  export type AdminSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama_rekening?: boolean
    nomor_rekening?: boolean
    bank?: boolean
    qris_image?: boolean
    updated_at?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminSettings"]>

  export type AdminSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama_rekening?: boolean
    nomor_rekening?: boolean
    bank?: boolean
    qris_image?: boolean
    updated_at?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminSettings"]>

  export type AdminSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama_rekening?: boolean
    nomor_rekening?: boolean
    bank?: boolean
    qris_image?: boolean
    updated_at?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminSettings"]>

  export type AdminSettingsSelectScalar = {
    id?: boolean
    nama_rekening?: boolean
    nomor_rekening?: boolean
    bank?: boolean
    qris_image?: boolean
    updated_at?: boolean
    user_id?: boolean
  }

  export type AdminSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama_rekening" | "nomor_rekening" | "bank" | "qris_image" | "updated_at" | "user_id", ExtArgs["result"]["adminSettings"]>
  export type AdminSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AdminSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminSettings"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nama_rekening: string | null
      nomor_rekening: string | null
      bank: string | null
      qris_image: string | null
      updated_at: Date
      user_id: string
    }, ExtArgs["result"]["adminSettings"]>
    composites: {}
  }

  type AdminSettingsGetPayload<S extends boolean | null | undefined | AdminSettingsDefaultArgs> = $Result.GetResult<Prisma.$AdminSettingsPayload, S>

  type AdminSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminSettingsCountAggregateInputType | true
    }

  export interface AdminSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminSettings'], meta: { name: 'AdminSettings' } }
    /**
     * Find zero or one AdminSettings that matches the filter.
     * @param {AdminSettingsFindUniqueArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminSettingsFindUniqueArgs>(args: SelectSubset<T, AdminSettingsFindUniqueArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminSettingsFindUniqueOrThrowArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsFindFirstArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminSettingsFindFirstArgs>(args?: SelectSubset<T, AdminSettingsFindFirstArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsFindFirstOrThrowArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminSettings
     * const adminSettings = await prisma.adminSettings.findMany()
     * 
     * // Get first 10 AdminSettings
     * const adminSettings = await prisma.adminSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminSettingsWithIdOnly = await prisma.adminSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminSettingsFindManyArgs>(args?: SelectSubset<T, AdminSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminSettings.
     * @param {AdminSettingsCreateArgs} args - Arguments to create a AdminSettings.
     * @example
     * // Create one AdminSettings
     * const AdminSettings = await prisma.adminSettings.create({
     *   data: {
     *     // ... data to create a AdminSettings
     *   }
     * })
     * 
     */
    create<T extends AdminSettingsCreateArgs>(args: SelectSubset<T, AdminSettingsCreateArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminSettings.
     * @param {AdminSettingsCreateManyArgs} args - Arguments to create many AdminSettings.
     * @example
     * // Create many AdminSettings
     * const adminSettings = await prisma.adminSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminSettingsCreateManyArgs>(args?: SelectSubset<T, AdminSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminSettings and returns the data saved in the database.
     * @param {AdminSettingsCreateManyAndReturnArgs} args - Arguments to create many AdminSettings.
     * @example
     * // Create many AdminSettings
     * const adminSettings = await prisma.adminSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminSettings and only return the `id`
     * const adminSettingsWithIdOnly = await prisma.adminSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminSettings.
     * @param {AdminSettingsDeleteArgs} args - Arguments to delete one AdminSettings.
     * @example
     * // Delete one AdminSettings
     * const AdminSettings = await prisma.adminSettings.delete({
     *   where: {
     *     // ... filter to delete one AdminSettings
     *   }
     * })
     * 
     */
    delete<T extends AdminSettingsDeleteArgs>(args: SelectSubset<T, AdminSettingsDeleteArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminSettings.
     * @param {AdminSettingsUpdateArgs} args - Arguments to update one AdminSettings.
     * @example
     * // Update one AdminSettings
     * const adminSettings = await prisma.adminSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminSettingsUpdateArgs>(args: SelectSubset<T, AdminSettingsUpdateArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminSettings.
     * @param {AdminSettingsDeleteManyArgs} args - Arguments to filter AdminSettings to delete.
     * @example
     * // Delete a few AdminSettings
     * const { count } = await prisma.adminSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminSettingsDeleteManyArgs>(args?: SelectSubset<T, AdminSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminSettings
     * const adminSettings = await prisma.adminSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminSettingsUpdateManyArgs>(args: SelectSubset<T, AdminSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminSettings and returns the data updated in the database.
     * @param {AdminSettingsUpdateManyAndReturnArgs} args - Arguments to update many AdminSettings.
     * @example
     * // Update many AdminSettings
     * const adminSettings = await prisma.adminSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminSettings and only return the `id`
     * const adminSettingsWithIdOnly = await prisma.adminSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminSettings.
     * @param {AdminSettingsUpsertArgs} args - Arguments to update or create a AdminSettings.
     * @example
     * // Update or create a AdminSettings
     * const adminSettings = await prisma.adminSettings.upsert({
     *   create: {
     *     // ... data to create a AdminSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminSettings we want to update
     *   }
     * })
     */
    upsert<T extends AdminSettingsUpsertArgs>(args: SelectSubset<T, AdminSettingsUpsertArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsCountArgs} args - Arguments to filter AdminSettings to count.
     * @example
     * // Count the number of AdminSettings
     * const count = await prisma.adminSettings.count({
     *   where: {
     *     // ... the filter for the AdminSettings we want to count
     *   }
     * })
    **/
    count<T extends AdminSettingsCountArgs>(
      args?: Subset<T, AdminSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminSettingsAggregateArgs>(args: Subset<T, AdminSettingsAggregateArgs>): Prisma.PrismaPromise<GetAdminSettingsAggregateType<T>>

    /**
     * Group by AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsGroupByArgs} args - Group by arguments.
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
      T extends AdminSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminSettingsGroupByArgs['orderBy'] }
        : { orderBy?: AdminSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AdminSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminSettings model
   */
  readonly fields: AdminSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminSettings model
   */
  interface AdminSettingsFieldRefs {
    readonly id: FieldRef<"AdminSettings", 'String'>
    readonly nama_rekening: FieldRef<"AdminSettings", 'String'>
    readonly nomor_rekening: FieldRef<"AdminSettings", 'String'>
    readonly bank: FieldRef<"AdminSettings", 'String'>
    readonly qris_image: FieldRef<"AdminSettings", 'String'>
    readonly updated_at: FieldRef<"AdminSettings", 'DateTime'>
    readonly user_id: FieldRef<"AdminSettings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AdminSettings findUnique
   */
  export type AdminSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings findUniqueOrThrow
   */
  export type AdminSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings findFirst
   */
  export type AdminSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminSettings.
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingsScalarFieldEnum | AdminSettingsScalarFieldEnum[]
  }

  /**
   * AdminSettings findFirstOrThrow
   */
  export type AdminSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminSettings.
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingsScalarFieldEnum | AdminSettingsScalarFieldEnum[]
  }

  /**
   * AdminSettings findMany
   */
  export type AdminSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminSettings.
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingsScalarFieldEnum | AdminSettingsScalarFieldEnum[]
  }

  /**
   * AdminSettings create
   */
  export type AdminSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminSettings.
     */
    data: XOR<AdminSettingsCreateInput, AdminSettingsUncheckedCreateInput>
  }

  /**
   * AdminSettings createMany
   */
  export type AdminSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminSettings.
     */
    data: AdminSettingsCreateManyInput | AdminSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminSettings createManyAndReturn
   */
  export type AdminSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many AdminSettings.
     */
    data: AdminSettingsCreateManyInput | AdminSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminSettings update
   */
  export type AdminSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminSettings.
     */
    data: XOR<AdminSettingsUpdateInput, AdminSettingsUncheckedUpdateInput>
    /**
     * Choose, which AdminSettings to update.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings updateMany
   */
  export type AdminSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminSettings.
     */
    data: XOR<AdminSettingsUpdateManyMutationInput, AdminSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AdminSettings to update
     */
    where?: AdminSettingsWhereInput
    /**
     * Limit how many AdminSettings to update.
     */
    limit?: number
  }

  /**
   * AdminSettings updateManyAndReturn
   */
  export type AdminSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The data used to update AdminSettings.
     */
    data: XOR<AdminSettingsUpdateManyMutationInput, AdminSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AdminSettings to update
     */
    where?: AdminSettingsWhereInput
    /**
     * Limit how many AdminSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminSettings upsert
   */
  export type AdminSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminSettings to update in case it exists.
     */
    where: AdminSettingsWhereUniqueInput
    /**
     * In case the AdminSettings found by the `where` argument doesn't exist, create a new AdminSettings with this data.
     */
    create: XOR<AdminSettingsCreateInput, AdminSettingsUncheckedCreateInput>
    /**
     * In case the AdminSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminSettingsUpdateInput, AdminSettingsUncheckedUpdateInput>
  }

  /**
   * AdminSettings delete
   */
  export type AdminSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
    /**
     * Filter which AdminSettings to delete.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings deleteMany
   */
  export type AdminSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminSettings to delete
     */
    where?: AdminSettingsWhereInput
    /**
     * Limit how many AdminSettings to delete.
     */
    limit?: number
  }

  /**
   * AdminSettings without action
   */
  export type AdminSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminSettingsInclude<ExtArgs> | null
  }


  /**
   * Model Properti
   */

  export type AggregateProperti = {
    _count: PropertiCountAggregateOutputType | null
    _min: PropertiMinAggregateOutputType | null
    _max: PropertiMaxAggregateOutputType | null
  }

  export type PropertiMinAggregateOutputType = {
    id: string | null
    nama: string | null
    alamat: string | null
    jenis: $Enums.JenisProperti | null
    deskripsi: string | null
    kebijakan: string | null
    created_at: Date | null
    updated_at: Date | null
    admin_id: string | null
  }

  export type PropertiMaxAggregateOutputType = {
    id: string | null
    nama: string | null
    alamat: string | null
    jenis: $Enums.JenisProperti | null
    deskripsi: string | null
    kebijakan: string | null
    created_at: Date | null
    updated_at: Date | null
    admin_id: string | null
  }

  export type PropertiCountAggregateOutputType = {
    id: number
    nama: number
    alamat: number
    jenis: number
    deskripsi: number
    kebijakan: number
    gambar: number
    created_at: number
    updated_at: number
    admin_id: number
    _all: number
  }


  export type PropertiMinAggregateInputType = {
    id?: true
    nama?: true
    alamat?: true
    jenis?: true
    deskripsi?: true
    kebijakan?: true
    created_at?: true
    updated_at?: true
    admin_id?: true
  }

  export type PropertiMaxAggregateInputType = {
    id?: true
    nama?: true
    alamat?: true
    jenis?: true
    deskripsi?: true
    kebijakan?: true
    created_at?: true
    updated_at?: true
    admin_id?: true
  }

  export type PropertiCountAggregateInputType = {
    id?: true
    nama?: true
    alamat?: true
    jenis?: true
    deskripsi?: true
    kebijakan?: true
    gambar?: true
    created_at?: true
    updated_at?: true
    admin_id?: true
    _all?: true
  }

  export type PropertiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properti to aggregate.
     */
    where?: PropertiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Propertis to fetch.
     */
    orderBy?: PropertiOrderByWithRelationInput | PropertiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Propertis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Propertis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Propertis
    **/
    _count?: true | PropertiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertiMaxAggregateInputType
  }

  export type GetPropertiAggregateType<T extends PropertiAggregateArgs> = {
        [P in keyof T & keyof AggregateProperti]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperti[P]>
      : GetScalarType<T[P], AggregateProperti[P]>
  }




  export type PropertiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertiWhereInput
    orderBy?: PropertiOrderByWithAggregationInput | PropertiOrderByWithAggregationInput[]
    by: PropertiScalarFieldEnum[] | PropertiScalarFieldEnum
    having?: PropertiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertiCountAggregateInputType | true
    _min?: PropertiMinAggregateInputType
    _max?: PropertiMaxAggregateInputType
  }

  export type PropertiGroupByOutputType = {
    id: string
    nama: string
    alamat: string
    jenis: $Enums.JenisProperti | null
    deskripsi: string | null
    kebijakan: string | null
    gambar: string[]
    created_at: Date
    updated_at: Date
    admin_id: string
    _count: PropertiCountAggregateOutputType | null
    _min: PropertiMinAggregateOutputType | null
    _max: PropertiMaxAggregateOutputType | null
  }

  type GetPropertiGroupByPayload<T extends PropertiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertiGroupByOutputType[P]>
            : GetScalarType<T[P], PropertiGroupByOutputType[P]>
        }
      >
    >


  export type PropertiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    alamat?: boolean
    jenis?: boolean
    deskripsi?: boolean
    kebijakan?: boolean
    gambar?: boolean
    created_at?: boolean
    updated_at?: boolean
    admin_id?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
    kamar?: boolean | Properti$kamarArgs<ExtArgs>
    komplain?: boolean | Properti$komplainArgs<ExtArgs>
    operator?: boolean | Properti$operatorArgs<ExtArgs>
    pemesanan?: boolean | Properti$pemesananArgs<ExtArgs>
    pengajuanDana?: boolean | Properti$pengajuanDanaArgs<ExtArgs>
    _count?: boolean | PropertiCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["properti"]>

  export type PropertiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    alamat?: boolean
    jenis?: boolean
    deskripsi?: boolean
    kebijakan?: boolean
    gambar?: boolean
    created_at?: boolean
    updated_at?: boolean
    admin_id?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["properti"]>

  export type PropertiSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    alamat?: boolean
    jenis?: boolean
    deskripsi?: boolean
    kebijakan?: boolean
    gambar?: boolean
    created_at?: boolean
    updated_at?: boolean
    admin_id?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["properti"]>

  export type PropertiSelectScalar = {
    id?: boolean
    nama?: boolean
    alamat?: boolean
    jenis?: boolean
    deskripsi?: boolean
    kebijakan?: boolean
    gambar?: boolean
    created_at?: boolean
    updated_at?: boolean
    admin_id?: boolean
  }

  export type PropertiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama" | "alamat" | "jenis" | "deskripsi" | "kebijakan" | "gambar" | "created_at" | "updated_at" | "admin_id", ExtArgs["result"]["properti"]>
  export type PropertiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
    kamar?: boolean | Properti$kamarArgs<ExtArgs>
    komplain?: boolean | Properti$komplainArgs<ExtArgs>
    operator?: boolean | Properti$operatorArgs<ExtArgs>
    pemesanan?: boolean | Properti$pemesananArgs<ExtArgs>
    pengajuanDana?: boolean | Properti$pengajuanDanaArgs<ExtArgs>
    _count?: boolean | PropertiCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PropertiIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PropertiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Properti"
    objects: {
      admin: Prisma.$UserPayload<ExtArgs>
      kamar: Prisma.$KamarPayload<ExtArgs>[]
      komplain: Prisma.$KomplainPayload<ExtArgs>[]
      operator: Prisma.$OperatorPayload<ExtArgs>[]
      pemesanan: Prisma.$PemesananPayload<ExtArgs>[]
      pengajuanDana: Prisma.$PengajuanDanaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nama: string
      alamat: string
      jenis: $Enums.JenisProperti | null
      deskripsi: string | null
      kebijakan: string | null
      gambar: string[]
      created_at: Date
      updated_at: Date
      admin_id: string
    }, ExtArgs["result"]["properti"]>
    composites: {}
  }

  type PropertiGetPayload<S extends boolean | null | undefined | PropertiDefaultArgs> = $Result.GetResult<Prisma.$PropertiPayload, S>

  type PropertiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertiFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertiCountAggregateInputType | true
    }

  export interface PropertiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Properti'], meta: { name: 'Properti' } }
    /**
     * Find zero or one Properti that matches the filter.
     * @param {PropertiFindUniqueArgs} args - Arguments to find a Properti
     * @example
     * // Get one Properti
     * const properti = await prisma.properti.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertiFindUniqueArgs>(args: SelectSubset<T, PropertiFindUniqueArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Properti that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertiFindUniqueOrThrowArgs} args - Arguments to find a Properti
     * @example
     * // Get one Properti
     * const properti = await prisma.properti.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertiFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Properti that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertiFindFirstArgs} args - Arguments to find a Properti
     * @example
     * // Get one Properti
     * const properti = await prisma.properti.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertiFindFirstArgs>(args?: SelectSubset<T, PropertiFindFirstArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Properti that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertiFindFirstOrThrowArgs} args - Arguments to find a Properti
     * @example
     * // Get one Properti
     * const properti = await prisma.properti.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertiFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertiFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Propertis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Propertis
     * const propertis = await prisma.properti.findMany()
     * 
     * // Get first 10 Propertis
     * const propertis = await prisma.properti.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertiWithIdOnly = await prisma.properti.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertiFindManyArgs>(args?: SelectSubset<T, PropertiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Properti.
     * @param {PropertiCreateArgs} args - Arguments to create a Properti.
     * @example
     * // Create one Properti
     * const Properti = await prisma.properti.create({
     *   data: {
     *     // ... data to create a Properti
     *   }
     * })
     * 
     */
    create<T extends PropertiCreateArgs>(args: SelectSubset<T, PropertiCreateArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Propertis.
     * @param {PropertiCreateManyArgs} args - Arguments to create many Propertis.
     * @example
     * // Create many Propertis
     * const properti = await prisma.properti.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertiCreateManyArgs>(args?: SelectSubset<T, PropertiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Propertis and returns the data saved in the database.
     * @param {PropertiCreateManyAndReturnArgs} args - Arguments to create many Propertis.
     * @example
     * // Create many Propertis
     * const properti = await prisma.properti.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Propertis and only return the `id`
     * const propertiWithIdOnly = await prisma.properti.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertiCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Properti.
     * @param {PropertiDeleteArgs} args - Arguments to delete one Properti.
     * @example
     * // Delete one Properti
     * const Properti = await prisma.properti.delete({
     *   where: {
     *     // ... filter to delete one Properti
     *   }
     * })
     * 
     */
    delete<T extends PropertiDeleteArgs>(args: SelectSubset<T, PropertiDeleteArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Properti.
     * @param {PropertiUpdateArgs} args - Arguments to update one Properti.
     * @example
     * // Update one Properti
     * const properti = await prisma.properti.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertiUpdateArgs>(args: SelectSubset<T, PropertiUpdateArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Propertis.
     * @param {PropertiDeleteManyArgs} args - Arguments to filter Propertis to delete.
     * @example
     * // Delete a few Propertis
     * const { count } = await prisma.properti.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertiDeleteManyArgs>(args?: SelectSubset<T, PropertiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Propertis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Propertis
     * const properti = await prisma.properti.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertiUpdateManyArgs>(args: SelectSubset<T, PropertiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Propertis and returns the data updated in the database.
     * @param {PropertiUpdateManyAndReturnArgs} args - Arguments to update many Propertis.
     * @example
     * // Update many Propertis
     * const properti = await prisma.properti.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Propertis and only return the `id`
     * const propertiWithIdOnly = await prisma.properti.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PropertiUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertiUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Properti.
     * @param {PropertiUpsertArgs} args - Arguments to update or create a Properti.
     * @example
     * // Update or create a Properti
     * const properti = await prisma.properti.upsert({
     *   create: {
     *     // ... data to create a Properti
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Properti we want to update
     *   }
     * })
     */
    upsert<T extends PropertiUpsertArgs>(args: SelectSubset<T, PropertiUpsertArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Propertis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertiCountArgs} args - Arguments to filter Propertis to count.
     * @example
     * // Count the number of Propertis
     * const count = await prisma.properti.count({
     *   where: {
     *     // ... the filter for the Propertis we want to count
     *   }
     * })
    **/
    count<T extends PropertiCountArgs>(
      args?: Subset<T, PropertiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Properti.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertiAggregateArgs>(args: Subset<T, PropertiAggregateArgs>): Prisma.PrismaPromise<GetPropertiAggregateType<T>>

    /**
     * Group by Properti.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertiGroupByArgs} args - Group by arguments.
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
      T extends PropertiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertiGroupByArgs['orderBy'] }
        : { orderBy?: PropertiGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PropertiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Properti model
   */
  readonly fields: PropertiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Properti.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    kamar<T extends Properti$kamarArgs<ExtArgs> = {}>(args?: Subset<T, Properti$kamarArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    komplain<T extends Properti$komplainArgs<ExtArgs> = {}>(args?: Subset<T, Properti$komplainArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    operator<T extends Properti$operatorArgs<ExtArgs> = {}>(args?: Subset<T, Properti$operatorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pemesanan<T extends Properti$pemesananArgs<ExtArgs> = {}>(args?: Subset<T, Properti$pemesananArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pengajuanDana<T extends Properti$pengajuanDanaArgs<ExtArgs> = {}>(args?: Subset<T, Properti$pengajuanDanaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Properti model
   */
  interface PropertiFieldRefs {
    readonly id: FieldRef<"Properti", 'String'>
    readonly nama: FieldRef<"Properti", 'String'>
    readonly alamat: FieldRef<"Properti", 'String'>
    readonly jenis: FieldRef<"Properti", 'JenisProperti'>
    readonly deskripsi: FieldRef<"Properti", 'String'>
    readonly kebijakan: FieldRef<"Properti", 'String'>
    readonly gambar: FieldRef<"Properti", 'String[]'>
    readonly created_at: FieldRef<"Properti", 'DateTime'>
    readonly updated_at: FieldRef<"Properti", 'DateTime'>
    readonly admin_id: FieldRef<"Properti", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Properti findUnique
   */
  export type PropertiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
    /**
     * Filter, which Properti to fetch.
     */
    where: PropertiWhereUniqueInput
  }

  /**
   * Properti findUniqueOrThrow
   */
  export type PropertiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
    /**
     * Filter, which Properti to fetch.
     */
    where: PropertiWhereUniqueInput
  }

  /**
   * Properti findFirst
   */
  export type PropertiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
    /**
     * Filter, which Properti to fetch.
     */
    where?: PropertiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Propertis to fetch.
     */
    orderBy?: PropertiOrderByWithRelationInput | PropertiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Propertis.
     */
    cursor?: PropertiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Propertis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Propertis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Propertis.
     */
    distinct?: PropertiScalarFieldEnum | PropertiScalarFieldEnum[]
  }

  /**
   * Properti findFirstOrThrow
   */
  export type PropertiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
    /**
     * Filter, which Properti to fetch.
     */
    where?: PropertiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Propertis to fetch.
     */
    orderBy?: PropertiOrderByWithRelationInput | PropertiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Propertis.
     */
    cursor?: PropertiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Propertis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Propertis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Propertis.
     */
    distinct?: PropertiScalarFieldEnum | PropertiScalarFieldEnum[]
  }

  /**
   * Properti findMany
   */
  export type PropertiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
    /**
     * Filter, which Propertis to fetch.
     */
    where?: PropertiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Propertis to fetch.
     */
    orderBy?: PropertiOrderByWithRelationInput | PropertiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Propertis.
     */
    cursor?: PropertiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Propertis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Propertis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Propertis.
     */
    distinct?: PropertiScalarFieldEnum | PropertiScalarFieldEnum[]
  }

  /**
   * Properti create
   */
  export type PropertiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
    /**
     * The data needed to create a Properti.
     */
    data: XOR<PropertiCreateInput, PropertiUncheckedCreateInput>
  }

  /**
   * Properti createMany
   */
  export type PropertiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Propertis.
     */
    data: PropertiCreateManyInput | PropertiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Properti createManyAndReturn
   */
  export type PropertiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * The data used to create many Propertis.
     */
    data: PropertiCreateManyInput | PropertiCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Properti update
   */
  export type PropertiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
    /**
     * The data needed to update a Properti.
     */
    data: XOR<PropertiUpdateInput, PropertiUncheckedUpdateInput>
    /**
     * Choose, which Properti to update.
     */
    where: PropertiWhereUniqueInput
  }

  /**
   * Properti updateMany
   */
  export type PropertiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Propertis.
     */
    data: XOR<PropertiUpdateManyMutationInput, PropertiUncheckedUpdateManyInput>
    /**
     * Filter which Propertis to update
     */
    where?: PropertiWhereInput
    /**
     * Limit how many Propertis to update.
     */
    limit?: number
  }

  /**
   * Properti updateManyAndReturn
   */
  export type PropertiUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * The data used to update Propertis.
     */
    data: XOR<PropertiUpdateManyMutationInput, PropertiUncheckedUpdateManyInput>
    /**
     * Filter which Propertis to update
     */
    where?: PropertiWhereInput
    /**
     * Limit how many Propertis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Properti upsert
   */
  export type PropertiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
    /**
     * The filter to search for the Properti to update in case it exists.
     */
    where: PropertiWhereUniqueInput
    /**
     * In case the Properti found by the `where` argument doesn't exist, create a new Properti with this data.
     */
    create: XOR<PropertiCreateInput, PropertiUncheckedCreateInput>
    /**
     * In case the Properti was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertiUpdateInput, PropertiUncheckedUpdateInput>
  }

  /**
   * Properti delete
   */
  export type PropertiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
    /**
     * Filter which Properti to delete.
     */
    where: PropertiWhereUniqueInput
  }

  /**
   * Properti deleteMany
   */
  export type PropertiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Propertis to delete
     */
    where?: PropertiWhereInput
    /**
     * Limit how many Propertis to delete.
     */
    limit?: number
  }

  /**
   * Properti.kamar
   */
  export type Properti$kamarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    where?: KamarWhereInput
    orderBy?: KamarOrderByWithRelationInput | KamarOrderByWithRelationInput[]
    cursor?: KamarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KamarScalarFieldEnum | KamarScalarFieldEnum[]
  }

  /**
   * Properti.komplain
   */
  export type Properti$komplainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    where?: KomplainWhereInput
    orderBy?: KomplainOrderByWithRelationInput | KomplainOrderByWithRelationInput[]
    cursor?: KomplainWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KomplainScalarFieldEnum | KomplainScalarFieldEnum[]
  }

  /**
   * Properti.operator
   */
  export type Properti$operatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    where?: OperatorWhereInput
    orderBy?: OperatorOrderByWithRelationInput | OperatorOrderByWithRelationInput[]
    cursor?: OperatorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OperatorScalarFieldEnum | OperatorScalarFieldEnum[]
  }

  /**
   * Properti.pemesanan
   */
  export type Properti$pemesananArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    where?: PemesananWhereInput
    orderBy?: PemesananOrderByWithRelationInput | PemesananOrderByWithRelationInput[]
    cursor?: PemesananWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PemesananScalarFieldEnum | PemesananScalarFieldEnum[]
  }

  /**
   * Properti.pengajuanDana
   */
  export type Properti$pengajuanDanaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    where?: PengajuanDanaWhereInput
    orderBy?: PengajuanDanaOrderByWithRelationInput | PengajuanDanaOrderByWithRelationInput[]
    cursor?: PengajuanDanaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PengajuanDanaScalarFieldEnum | PengajuanDanaScalarFieldEnum[]
  }

  /**
   * Properti without action
   */
  export type PropertiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Properti
     */
    select?: PropertiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Properti
     */
    omit?: PropertiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertiInclude<ExtArgs> | null
  }


  /**
   * Model Kamar
   */

  export type AggregateKamar = {
    _count: KamarCountAggregateOutputType | null
    _min: KamarMinAggregateOutputType | null
    _max: KamarMaxAggregateOutputType | null
  }

  export type KamarMinAggregateOutputType = {
    id: string | null
    nomor: string | null
    tipe: $Enums.TipeKamar | null
    luas: string | null
    deskripsi: string | null
    status: $Enums.StatusKamar | null
    created_at: Date | null
    updated_at: Date | null
    properti_id: string | null
  }

  export type KamarMaxAggregateOutputType = {
    id: string | null
    nomor: string | null
    tipe: $Enums.TipeKamar | null
    luas: string | null
    deskripsi: string | null
    status: $Enums.StatusKamar | null
    created_at: Date | null
    updated_at: Date | null
    properti_id: string | null
  }

  export type KamarCountAggregateOutputType = {
    id: number
    nomor: number
    tipe: number
    luas: number
    fasilitas: number
    deskripsi: number
    tarif: number
    gambar: number
    status: number
    created_at: number
    updated_at: number
    properti_id: number
    _all: number
  }


  export type KamarMinAggregateInputType = {
    id?: true
    nomor?: true
    tipe?: true
    luas?: true
    deskripsi?: true
    status?: true
    created_at?: true
    updated_at?: true
    properti_id?: true
  }

  export type KamarMaxAggregateInputType = {
    id?: true
    nomor?: true
    tipe?: true
    luas?: true
    deskripsi?: true
    status?: true
    created_at?: true
    updated_at?: true
    properti_id?: true
  }

  export type KamarCountAggregateInputType = {
    id?: true
    nomor?: true
    tipe?: true
    luas?: true
    fasilitas?: true
    deskripsi?: true
    tarif?: true
    gambar?: true
    status?: true
    created_at?: true
    updated_at?: true
    properti_id?: true
    _all?: true
  }

  export type KamarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kamar to aggregate.
     */
    where?: KamarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kamars to fetch.
     */
    orderBy?: KamarOrderByWithRelationInput | KamarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KamarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kamars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kamars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Kamars
    **/
    _count?: true | KamarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KamarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KamarMaxAggregateInputType
  }

  export type GetKamarAggregateType<T extends KamarAggregateArgs> = {
        [P in keyof T & keyof AggregateKamar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKamar[P]>
      : GetScalarType<T[P], AggregateKamar[P]>
  }




  export type KamarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KamarWhereInput
    orderBy?: KamarOrderByWithAggregationInput | KamarOrderByWithAggregationInput[]
    by: KamarScalarFieldEnum[] | KamarScalarFieldEnum
    having?: KamarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KamarCountAggregateInputType | true
    _min?: KamarMinAggregateInputType
    _max?: KamarMaxAggregateInputType
  }

  export type KamarGroupByOutputType = {
    id: string
    nomor: string
    tipe: $Enums.TipeKamar
    luas: string | null
    fasilitas: string[]
    deskripsi: string | null
    tarif: JsonValue | null
    gambar: string[]
    status: $Enums.StatusKamar
    created_at: Date
    updated_at: Date
    properti_id: string
    _count: KamarCountAggregateOutputType | null
    _min: KamarMinAggregateOutputType | null
    _max: KamarMaxAggregateOutputType | null
  }

  type GetKamarGroupByPayload<T extends KamarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KamarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KamarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KamarGroupByOutputType[P]>
            : GetScalarType<T[P], KamarGroupByOutputType[P]>
        }
      >
    >


  export type KamarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomor?: boolean
    tipe?: boolean
    luas?: boolean
    fasilitas?: boolean
    deskripsi?: boolean
    tarif?: boolean
    gambar?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    properti_id?: boolean
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
    pemesanan?: boolean | Kamar$pemesananArgs<ExtArgs>
    penghuni?: boolean | Kamar$penghuniArgs<ExtArgs>
    _count?: boolean | KamarCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kamar"]>

  export type KamarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomor?: boolean
    tipe?: boolean
    luas?: boolean
    fasilitas?: boolean
    deskripsi?: boolean
    tarif?: boolean
    gambar?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    properti_id?: boolean
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kamar"]>

  export type KamarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomor?: boolean
    tipe?: boolean
    luas?: boolean
    fasilitas?: boolean
    deskripsi?: boolean
    tarif?: boolean
    gambar?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    properti_id?: boolean
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kamar"]>

  export type KamarSelectScalar = {
    id?: boolean
    nomor?: boolean
    tipe?: boolean
    luas?: boolean
    fasilitas?: boolean
    deskripsi?: boolean
    tarif?: boolean
    gambar?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    properti_id?: boolean
  }

  export type KamarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nomor" | "tipe" | "luas" | "fasilitas" | "deskripsi" | "tarif" | "gambar" | "status" | "created_at" | "updated_at" | "properti_id", ExtArgs["result"]["kamar"]>
  export type KamarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
    pemesanan?: boolean | Kamar$pemesananArgs<ExtArgs>
    penghuni?: boolean | Kamar$penghuniArgs<ExtArgs>
    _count?: boolean | KamarCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KamarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }
  export type KamarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }

  export type $KamarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Kamar"
    objects: {
      properti: Prisma.$PropertiPayload<ExtArgs>
      pemesanan: Prisma.$PemesananPayload<ExtArgs>[]
      penghuni: Prisma.$PenghuniPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nomor: string
      tipe: $Enums.TipeKamar
      luas: string | null
      fasilitas: string[]
      deskripsi: string | null
      tarif: Prisma.JsonValue | null
      gambar: string[]
      status: $Enums.StatusKamar
      created_at: Date
      updated_at: Date
      properti_id: string
    }, ExtArgs["result"]["kamar"]>
    composites: {}
  }

  type KamarGetPayload<S extends boolean | null | undefined | KamarDefaultArgs> = $Result.GetResult<Prisma.$KamarPayload, S>

  type KamarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KamarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KamarCountAggregateInputType | true
    }

  export interface KamarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Kamar'], meta: { name: 'Kamar' } }
    /**
     * Find zero or one Kamar that matches the filter.
     * @param {KamarFindUniqueArgs} args - Arguments to find a Kamar
     * @example
     * // Get one Kamar
     * const kamar = await prisma.kamar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KamarFindUniqueArgs>(args: SelectSubset<T, KamarFindUniqueArgs<ExtArgs>>): Prisma__KamarClient<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Kamar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KamarFindUniqueOrThrowArgs} args - Arguments to find a Kamar
     * @example
     * // Get one Kamar
     * const kamar = await prisma.kamar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KamarFindUniqueOrThrowArgs>(args: SelectSubset<T, KamarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KamarClient<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kamar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KamarFindFirstArgs} args - Arguments to find a Kamar
     * @example
     * // Get one Kamar
     * const kamar = await prisma.kamar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KamarFindFirstArgs>(args?: SelectSubset<T, KamarFindFirstArgs<ExtArgs>>): Prisma__KamarClient<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kamar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KamarFindFirstOrThrowArgs} args - Arguments to find a Kamar
     * @example
     * // Get one Kamar
     * const kamar = await prisma.kamar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KamarFindFirstOrThrowArgs>(args?: SelectSubset<T, KamarFindFirstOrThrowArgs<ExtArgs>>): Prisma__KamarClient<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Kamars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KamarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kamars
     * const kamars = await prisma.kamar.findMany()
     * 
     * // Get first 10 Kamars
     * const kamars = await prisma.kamar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kamarWithIdOnly = await prisma.kamar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KamarFindManyArgs>(args?: SelectSubset<T, KamarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Kamar.
     * @param {KamarCreateArgs} args - Arguments to create a Kamar.
     * @example
     * // Create one Kamar
     * const Kamar = await prisma.kamar.create({
     *   data: {
     *     // ... data to create a Kamar
     *   }
     * })
     * 
     */
    create<T extends KamarCreateArgs>(args: SelectSubset<T, KamarCreateArgs<ExtArgs>>): Prisma__KamarClient<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Kamars.
     * @param {KamarCreateManyArgs} args - Arguments to create many Kamars.
     * @example
     * // Create many Kamars
     * const kamar = await prisma.kamar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KamarCreateManyArgs>(args?: SelectSubset<T, KamarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Kamars and returns the data saved in the database.
     * @param {KamarCreateManyAndReturnArgs} args - Arguments to create many Kamars.
     * @example
     * // Create many Kamars
     * const kamar = await prisma.kamar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Kamars and only return the `id`
     * const kamarWithIdOnly = await prisma.kamar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KamarCreateManyAndReturnArgs>(args?: SelectSubset<T, KamarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Kamar.
     * @param {KamarDeleteArgs} args - Arguments to delete one Kamar.
     * @example
     * // Delete one Kamar
     * const Kamar = await prisma.kamar.delete({
     *   where: {
     *     // ... filter to delete one Kamar
     *   }
     * })
     * 
     */
    delete<T extends KamarDeleteArgs>(args: SelectSubset<T, KamarDeleteArgs<ExtArgs>>): Prisma__KamarClient<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Kamar.
     * @param {KamarUpdateArgs} args - Arguments to update one Kamar.
     * @example
     * // Update one Kamar
     * const kamar = await prisma.kamar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KamarUpdateArgs>(args: SelectSubset<T, KamarUpdateArgs<ExtArgs>>): Prisma__KamarClient<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Kamars.
     * @param {KamarDeleteManyArgs} args - Arguments to filter Kamars to delete.
     * @example
     * // Delete a few Kamars
     * const { count } = await prisma.kamar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KamarDeleteManyArgs>(args?: SelectSubset<T, KamarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kamars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KamarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kamars
     * const kamar = await prisma.kamar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KamarUpdateManyArgs>(args: SelectSubset<T, KamarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kamars and returns the data updated in the database.
     * @param {KamarUpdateManyAndReturnArgs} args - Arguments to update many Kamars.
     * @example
     * // Update many Kamars
     * const kamar = await prisma.kamar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Kamars and only return the `id`
     * const kamarWithIdOnly = await prisma.kamar.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KamarUpdateManyAndReturnArgs>(args: SelectSubset<T, KamarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Kamar.
     * @param {KamarUpsertArgs} args - Arguments to update or create a Kamar.
     * @example
     * // Update or create a Kamar
     * const kamar = await prisma.kamar.upsert({
     *   create: {
     *     // ... data to create a Kamar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kamar we want to update
     *   }
     * })
     */
    upsert<T extends KamarUpsertArgs>(args: SelectSubset<T, KamarUpsertArgs<ExtArgs>>): Prisma__KamarClient<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Kamars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KamarCountArgs} args - Arguments to filter Kamars to count.
     * @example
     * // Count the number of Kamars
     * const count = await prisma.kamar.count({
     *   where: {
     *     // ... the filter for the Kamars we want to count
     *   }
     * })
    **/
    count<T extends KamarCountArgs>(
      args?: Subset<T, KamarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KamarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kamar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KamarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KamarAggregateArgs>(args: Subset<T, KamarAggregateArgs>): Prisma.PrismaPromise<GetKamarAggregateType<T>>

    /**
     * Group by Kamar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KamarGroupByArgs} args - Group by arguments.
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
      T extends KamarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KamarGroupByArgs['orderBy'] }
        : { orderBy?: KamarGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, KamarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKamarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Kamar model
   */
  readonly fields: KamarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Kamar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KamarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    properti<T extends PropertiDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertiDefaultArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pemesanan<T extends Kamar$pemesananArgs<ExtArgs> = {}>(args?: Subset<T, Kamar$pemesananArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    penghuni<T extends Kamar$penghuniArgs<ExtArgs> = {}>(args?: Subset<T, Kamar$penghuniArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Kamar model
   */
  interface KamarFieldRefs {
    readonly id: FieldRef<"Kamar", 'String'>
    readonly nomor: FieldRef<"Kamar", 'String'>
    readonly tipe: FieldRef<"Kamar", 'TipeKamar'>
    readonly luas: FieldRef<"Kamar", 'String'>
    readonly fasilitas: FieldRef<"Kamar", 'String[]'>
    readonly deskripsi: FieldRef<"Kamar", 'String'>
    readonly tarif: FieldRef<"Kamar", 'Json'>
    readonly gambar: FieldRef<"Kamar", 'String[]'>
    readonly status: FieldRef<"Kamar", 'StatusKamar'>
    readonly created_at: FieldRef<"Kamar", 'DateTime'>
    readonly updated_at: FieldRef<"Kamar", 'DateTime'>
    readonly properti_id: FieldRef<"Kamar", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Kamar findUnique
   */
  export type KamarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    /**
     * Filter, which Kamar to fetch.
     */
    where: KamarWhereUniqueInput
  }

  /**
   * Kamar findUniqueOrThrow
   */
  export type KamarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    /**
     * Filter, which Kamar to fetch.
     */
    where: KamarWhereUniqueInput
  }

  /**
   * Kamar findFirst
   */
  export type KamarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    /**
     * Filter, which Kamar to fetch.
     */
    where?: KamarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kamars to fetch.
     */
    orderBy?: KamarOrderByWithRelationInput | KamarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kamars.
     */
    cursor?: KamarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kamars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kamars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kamars.
     */
    distinct?: KamarScalarFieldEnum | KamarScalarFieldEnum[]
  }

  /**
   * Kamar findFirstOrThrow
   */
  export type KamarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    /**
     * Filter, which Kamar to fetch.
     */
    where?: KamarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kamars to fetch.
     */
    orderBy?: KamarOrderByWithRelationInput | KamarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kamars.
     */
    cursor?: KamarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kamars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kamars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kamars.
     */
    distinct?: KamarScalarFieldEnum | KamarScalarFieldEnum[]
  }

  /**
   * Kamar findMany
   */
  export type KamarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    /**
     * Filter, which Kamars to fetch.
     */
    where?: KamarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kamars to fetch.
     */
    orderBy?: KamarOrderByWithRelationInput | KamarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Kamars.
     */
    cursor?: KamarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kamars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kamars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kamars.
     */
    distinct?: KamarScalarFieldEnum | KamarScalarFieldEnum[]
  }

  /**
   * Kamar create
   */
  export type KamarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    /**
     * The data needed to create a Kamar.
     */
    data: XOR<KamarCreateInput, KamarUncheckedCreateInput>
  }

  /**
   * Kamar createMany
   */
  export type KamarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Kamars.
     */
    data: KamarCreateManyInput | KamarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kamar createManyAndReturn
   */
  export type KamarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * The data used to create many Kamars.
     */
    data: KamarCreateManyInput | KamarCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Kamar update
   */
  export type KamarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    /**
     * The data needed to update a Kamar.
     */
    data: XOR<KamarUpdateInput, KamarUncheckedUpdateInput>
    /**
     * Choose, which Kamar to update.
     */
    where: KamarWhereUniqueInput
  }

  /**
   * Kamar updateMany
   */
  export type KamarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Kamars.
     */
    data: XOR<KamarUpdateManyMutationInput, KamarUncheckedUpdateManyInput>
    /**
     * Filter which Kamars to update
     */
    where?: KamarWhereInput
    /**
     * Limit how many Kamars to update.
     */
    limit?: number
  }

  /**
   * Kamar updateManyAndReturn
   */
  export type KamarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * The data used to update Kamars.
     */
    data: XOR<KamarUpdateManyMutationInput, KamarUncheckedUpdateManyInput>
    /**
     * Filter which Kamars to update
     */
    where?: KamarWhereInput
    /**
     * Limit how many Kamars to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Kamar upsert
   */
  export type KamarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    /**
     * The filter to search for the Kamar to update in case it exists.
     */
    where: KamarWhereUniqueInput
    /**
     * In case the Kamar found by the `where` argument doesn't exist, create a new Kamar with this data.
     */
    create: XOR<KamarCreateInput, KamarUncheckedCreateInput>
    /**
     * In case the Kamar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KamarUpdateInput, KamarUncheckedUpdateInput>
  }

  /**
   * Kamar delete
   */
  export type KamarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    /**
     * Filter which Kamar to delete.
     */
    where: KamarWhereUniqueInput
  }

  /**
   * Kamar deleteMany
   */
  export type KamarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kamars to delete
     */
    where?: KamarWhereInput
    /**
     * Limit how many Kamars to delete.
     */
    limit?: number
  }

  /**
   * Kamar.pemesanan
   */
  export type Kamar$pemesananArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    where?: PemesananWhereInput
    orderBy?: PemesananOrderByWithRelationInput | PemesananOrderByWithRelationInput[]
    cursor?: PemesananWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PemesananScalarFieldEnum | PemesananScalarFieldEnum[]
  }

  /**
   * Kamar.penghuni
   */
  export type Kamar$penghuniArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    where?: PenghuniWhereInput
  }

  /**
   * Kamar without action
   */
  export type KamarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
  }


  /**
   * Model Pemesanan
   */

  export type AggregatePemesanan = {
    _count: PemesananCountAggregateOutputType | null
    _avg: PemesananAvgAggregateOutputType | null
    _sum: PemesananSumAggregateOutputType | null
    _min: PemesananMinAggregateOutputType | null
    _max: PemesananMaxAggregateOutputType | null
  }

  export type PemesananAvgAggregateOutputType = {
    durasi_sewa: number | null
    total_bayar: number | null
  }

  export type PemesananSumAggregateOutputType = {
    durasi_sewa: number | null
    total_bayar: number | null
  }

  export type PemesananMinAggregateOutputType = {
    id: string | null
    durasi_sewa: number | null
    tgl_masuk: Date | null
    metode_bayar: string | null
    total_bayar: number | null
    status: $Enums.StatusPemesanan | null
    created_at: Date | null
    updated_at: Date | null
    kamar_id: string | null
    penghuni_id: string | null
    properti_id: string | null
  }

  export type PemesananMaxAggregateOutputType = {
    id: string | null
    durasi_sewa: number | null
    tgl_masuk: Date | null
    metode_bayar: string | null
    total_bayar: number | null
    status: $Enums.StatusPemesanan | null
    created_at: Date | null
    updated_at: Date | null
    kamar_id: string | null
    penghuni_id: string | null
    properti_id: string | null
  }

  export type PemesananCountAggregateOutputType = {
    id: number
    durasi_sewa: number
    tgl_masuk: number
    metode_bayar: number
    total_bayar: number
    status: number
    created_at: number
    updated_at: number
    kamar_id: number
    penghuni_id: number
    properti_id: number
    _all: number
  }


  export type PemesananAvgAggregateInputType = {
    durasi_sewa?: true
    total_bayar?: true
  }

  export type PemesananSumAggregateInputType = {
    durasi_sewa?: true
    total_bayar?: true
  }

  export type PemesananMinAggregateInputType = {
    id?: true
    durasi_sewa?: true
    tgl_masuk?: true
    metode_bayar?: true
    total_bayar?: true
    status?: true
    created_at?: true
    updated_at?: true
    kamar_id?: true
    penghuni_id?: true
    properti_id?: true
  }

  export type PemesananMaxAggregateInputType = {
    id?: true
    durasi_sewa?: true
    tgl_masuk?: true
    metode_bayar?: true
    total_bayar?: true
    status?: true
    created_at?: true
    updated_at?: true
    kamar_id?: true
    penghuni_id?: true
    properti_id?: true
  }

  export type PemesananCountAggregateInputType = {
    id?: true
    durasi_sewa?: true
    tgl_masuk?: true
    metode_bayar?: true
    total_bayar?: true
    status?: true
    created_at?: true
    updated_at?: true
    kamar_id?: true
    penghuni_id?: true
    properti_id?: true
    _all?: true
  }

  export type PemesananAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pemesanan to aggregate.
     */
    where?: PemesananWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pemesanans to fetch.
     */
    orderBy?: PemesananOrderByWithRelationInput | PemesananOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PemesananWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pemesanans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pemesanans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pemesanans
    **/
    _count?: true | PemesananCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PemesananAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PemesananSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PemesananMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PemesananMaxAggregateInputType
  }

  export type GetPemesananAggregateType<T extends PemesananAggregateArgs> = {
        [P in keyof T & keyof AggregatePemesanan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePemesanan[P]>
      : GetScalarType<T[P], AggregatePemesanan[P]>
  }




  export type PemesananGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PemesananWhereInput
    orderBy?: PemesananOrderByWithAggregationInput | PemesananOrderByWithAggregationInput[]
    by: PemesananScalarFieldEnum[] | PemesananScalarFieldEnum
    having?: PemesananScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PemesananCountAggregateInputType | true
    _avg?: PemesananAvgAggregateInputType
    _sum?: PemesananSumAggregateInputType
    _min?: PemesananMinAggregateInputType
    _max?: PemesananMaxAggregateInputType
  }

  export type PemesananGroupByOutputType = {
    id: string
    durasi_sewa: number
    tgl_masuk: Date
    metode_bayar: string
    total_bayar: number
    status: $Enums.StatusPemesanan
    created_at: Date
    updated_at: Date
    kamar_id: string
    penghuni_id: string
    properti_id: string
    _count: PemesananCountAggregateOutputType | null
    _avg: PemesananAvgAggregateOutputType | null
    _sum: PemesananSumAggregateOutputType | null
    _min: PemesananMinAggregateOutputType | null
    _max: PemesananMaxAggregateOutputType | null
  }

  type GetPemesananGroupByPayload<T extends PemesananGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PemesananGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PemesananGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PemesananGroupByOutputType[P]>
            : GetScalarType<T[P], PemesananGroupByOutputType[P]>
        }
      >
    >


  export type PemesananSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    durasi_sewa?: boolean
    tgl_masuk?: boolean
    metode_bayar?: boolean
    total_bayar?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    kamar_id?: boolean
    penghuni_id?: boolean
    properti_id?: boolean
    kamar?: boolean | KamarDefaultArgs<ExtArgs>
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
    pembayaran?: boolean | Pemesanan$pembayaranArgs<ExtArgs>
  }, ExtArgs["result"]["pemesanan"]>

  export type PemesananSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    durasi_sewa?: boolean
    tgl_masuk?: boolean
    metode_bayar?: boolean
    total_bayar?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    kamar_id?: boolean
    penghuni_id?: boolean
    properti_id?: boolean
    kamar?: boolean | KamarDefaultArgs<ExtArgs>
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pemesanan"]>

  export type PemesananSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    durasi_sewa?: boolean
    tgl_masuk?: boolean
    metode_bayar?: boolean
    total_bayar?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    kamar_id?: boolean
    penghuni_id?: boolean
    properti_id?: boolean
    kamar?: boolean | KamarDefaultArgs<ExtArgs>
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pemesanan"]>

  export type PemesananSelectScalar = {
    id?: boolean
    durasi_sewa?: boolean
    tgl_masuk?: boolean
    metode_bayar?: boolean
    total_bayar?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    kamar_id?: boolean
    penghuni_id?: boolean
    properti_id?: boolean
  }

  export type PemesananOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "durasi_sewa" | "tgl_masuk" | "metode_bayar" | "total_bayar" | "status" | "created_at" | "updated_at" | "kamar_id" | "penghuni_id" | "properti_id", ExtArgs["result"]["pemesanan"]>
  export type PemesananInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kamar?: boolean | KamarDefaultArgs<ExtArgs>
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
    pembayaran?: boolean | Pemesanan$pembayaranArgs<ExtArgs>
  }
  export type PemesananIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kamar?: boolean | KamarDefaultArgs<ExtArgs>
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }
  export type PemesananIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kamar?: boolean | KamarDefaultArgs<ExtArgs>
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }

  export type $PemesananPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pemesanan"
    objects: {
      kamar: Prisma.$KamarPayload<ExtArgs>
      penghuni: Prisma.$PenghuniPayload<ExtArgs>
      properti: Prisma.$PropertiPayload<ExtArgs>
      pembayaran: Prisma.$PembayaranPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      durasi_sewa: number
      tgl_masuk: Date
      metode_bayar: string
      total_bayar: number
      status: $Enums.StatusPemesanan
      created_at: Date
      updated_at: Date
      kamar_id: string
      penghuni_id: string
      properti_id: string
    }, ExtArgs["result"]["pemesanan"]>
    composites: {}
  }

  type PemesananGetPayload<S extends boolean | null | undefined | PemesananDefaultArgs> = $Result.GetResult<Prisma.$PemesananPayload, S>

  type PemesananCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PemesananFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PemesananCountAggregateInputType | true
    }

  export interface PemesananDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pemesanan'], meta: { name: 'Pemesanan' } }
    /**
     * Find zero or one Pemesanan that matches the filter.
     * @param {PemesananFindUniqueArgs} args - Arguments to find a Pemesanan
     * @example
     * // Get one Pemesanan
     * const pemesanan = await prisma.pemesanan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PemesananFindUniqueArgs>(args: SelectSubset<T, PemesananFindUniqueArgs<ExtArgs>>): Prisma__PemesananClient<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pemesanan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PemesananFindUniqueOrThrowArgs} args - Arguments to find a Pemesanan
     * @example
     * // Get one Pemesanan
     * const pemesanan = await prisma.pemesanan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PemesananFindUniqueOrThrowArgs>(args: SelectSubset<T, PemesananFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PemesananClient<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pemesanan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PemesananFindFirstArgs} args - Arguments to find a Pemesanan
     * @example
     * // Get one Pemesanan
     * const pemesanan = await prisma.pemesanan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PemesananFindFirstArgs>(args?: SelectSubset<T, PemesananFindFirstArgs<ExtArgs>>): Prisma__PemesananClient<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pemesanan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PemesananFindFirstOrThrowArgs} args - Arguments to find a Pemesanan
     * @example
     * // Get one Pemesanan
     * const pemesanan = await prisma.pemesanan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PemesananFindFirstOrThrowArgs>(args?: SelectSubset<T, PemesananFindFirstOrThrowArgs<ExtArgs>>): Prisma__PemesananClient<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pemesanans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PemesananFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pemesanans
     * const pemesanans = await prisma.pemesanan.findMany()
     * 
     * // Get first 10 Pemesanans
     * const pemesanans = await prisma.pemesanan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pemesananWithIdOnly = await prisma.pemesanan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PemesananFindManyArgs>(args?: SelectSubset<T, PemesananFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pemesanan.
     * @param {PemesananCreateArgs} args - Arguments to create a Pemesanan.
     * @example
     * // Create one Pemesanan
     * const Pemesanan = await prisma.pemesanan.create({
     *   data: {
     *     // ... data to create a Pemesanan
     *   }
     * })
     * 
     */
    create<T extends PemesananCreateArgs>(args: SelectSubset<T, PemesananCreateArgs<ExtArgs>>): Prisma__PemesananClient<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pemesanans.
     * @param {PemesananCreateManyArgs} args - Arguments to create many Pemesanans.
     * @example
     * // Create many Pemesanans
     * const pemesanan = await prisma.pemesanan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PemesananCreateManyArgs>(args?: SelectSubset<T, PemesananCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pemesanans and returns the data saved in the database.
     * @param {PemesananCreateManyAndReturnArgs} args - Arguments to create many Pemesanans.
     * @example
     * // Create many Pemesanans
     * const pemesanan = await prisma.pemesanan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pemesanans and only return the `id`
     * const pemesananWithIdOnly = await prisma.pemesanan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PemesananCreateManyAndReturnArgs>(args?: SelectSubset<T, PemesananCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pemesanan.
     * @param {PemesananDeleteArgs} args - Arguments to delete one Pemesanan.
     * @example
     * // Delete one Pemesanan
     * const Pemesanan = await prisma.pemesanan.delete({
     *   where: {
     *     // ... filter to delete one Pemesanan
     *   }
     * })
     * 
     */
    delete<T extends PemesananDeleteArgs>(args: SelectSubset<T, PemesananDeleteArgs<ExtArgs>>): Prisma__PemesananClient<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pemesanan.
     * @param {PemesananUpdateArgs} args - Arguments to update one Pemesanan.
     * @example
     * // Update one Pemesanan
     * const pemesanan = await prisma.pemesanan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PemesananUpdateArgs>(args: SelectSubset<T, PemesananUpdateArgs<ExtArgs>>): Prisma__PemesananClient<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pemesanans.
     * @param {PemesananDeleteManyArgs} args - Arguments to filter Pemesanans to delete.
     * @example
     * // Delete a few Pemesanans
     * const { count } = await prisma.pemesanan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PemesananDeleteManyArgs>(args?: SelectSubset<T, PemesananDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pemesanans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PemesananUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pemesanans
     * const pemesanan = await prisma.pemesanan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PemesananUpdateManyArgs>(args: SelectSubset<T, PemesananUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pemesanans and returns the data updated in the database.
     * @param {PemesananUpdateManyAndReturnArgs} args - Arguments to update many Pemesanans.
     * @example
     * // Update many Pemesanans
     * const pemesanan = await prisma.pemesanan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pemesanans and only return the `id`
     * const pemesananWithIdOnly = await prisma.pemesanan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PemesananUpdateManyAndReturnArgs>(args: SelectSubset<T, PemesananUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pemesanan.
     * @param {PemesananUpsertArgs} args - Arguments to update or create a Pemesanan.
     * @example
     * // Update or create a Pemesanan
     * const pemesanan = await prisma.pemesanan.upsert({
     *   create: {
     *     // ... data to create a Pemesanan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pemesanan we want to update
     *   }
     * })
     */
    upsert<T extends PemesananUpsertArgs>(args: SelectSubset<T, PemesananUpsertArgs<ExtArgs>>): Prisma__PemesananClient<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pemesanans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PemesananCountArgs} args - Arguments to filter Pemesanans to count.
     * @example
     * // Count the number of Pemesanans
     * const count = await prisma.pemesanan.count({
     *   where: {
     *     // ... the filter for the Pemesanans we want to count
     *   }
     * })
    **/
    count<T extends PemesananCountArgs>(
      args?: Subset<T, PemesananCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PemesananCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pemesanan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PemesananAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PemesananAggregateArgs>(args: Subset<T, PemesananAggregateArgs>): Prisma.PrismaPromise<GetPemesananAggregateType<T>>

    /**
     * Group by Pemesanan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PemesananGroupByArgs} args - Group by arguments.
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
      T extends PemesananGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PemesananGroupByArgs['orderBy'] }
        : { orderBy?: PemesananGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PemesananGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPemesananGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pemesanan model
   */
  readonly fields: PemesananFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pemesanan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PemesananClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kamar<T extends KamarDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KamarDefaultArgs<ExtArgs>>): Prisma__KamarClient<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    penghuni<T extends PenghuniDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PenghuniDefaultArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    properti<T extends PropertiDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertiDefaultArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pembayaran<T extends Pemesanan$pembayaranArgs<ExtArgs> = {}>(args?: Subset<T, Pemesanan$pembayaranArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pemesanan model
   */
  interface PemesananFieldRefs {
    readonly id: FieldRef<"Pemesanan", 'String'>
    readonly durasi_sewa: FieldRef<"Pemesanan", 'Int'>
    readonly tgl_masuk: FieldRef<"Pemesanan", 'DateTime'>
    readonly metode_bayar: FieldRef<"Pemesanan", 'String'>
    readonly total_bayar: FieldRef<"Pemesanan", 'Int'>
    readonly status: FieldRef<"Pemesanan", 'StatusPemesanan'>
    readonly created_at: FieldRef<"Pemesanan", 'DateTime'>
    readonly updated_at: FieldRef<"Pemesanan", 'DateTime'>
    readonly kamar_id: FieldRef<"Pemesanan", 'String'>
    readonly penghuni_id: FieldRef<"Pemesanan", 'String'>
    readonly properti_id: FieldRef<"Pemesanan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pemesanan findUnique
   */
  export type PemesananFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    /**
     * Filter, which Pemesanan to fetch.
     */
    where: PemesananWhereUniqueInput
  }

  /**
   * Pemesanan findUniqueOrThrow
   */
  export type PemesananFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    /**
     * Filter, which Pemesanan to fetch.
     */
    where: PemesananWhereUniqueInput
  }

  /**
   * Pemesanan findFirst
   */
  export type PemesananFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    /**
     * Filter, which Pemesanan to fetch.
     */
    where?: PemesananWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pemesanans to fetch.
     */
    orderBy?: PemesananOrderByWithRelationInput | PemesananOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pemesanans.
     */
    cursor?: PemesananWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pemesanans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pemesanans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pemesanans.
     */
    distinct?: PemesananScalarFieldEnum | PemesananScalarFieldEnum[]
  }

  /**
   * Pemesanan findFirstOrThrow
   */
  export type PemesananFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    /**
     * Filter, which Pemesanan to fetch.
     */
    where?: PemesananWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pemesanans to fetch.
     */
    orderBy?: PemesananOrderByWithRelationInput | PemesananOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pemesanans.
     */
    cursor?: PemesananWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pemesanans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pemesanans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pemesanans.
     */
    distinct?: PemesananScalarFieldEnum | PemesananScalarFieldEnum[]
  }

  /**
   * Pemesanan findMany
   */
  export type PemesananFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    /**
     * Filter, which Pemesanans to fetch.
     */
    where?: PemesananWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pemesanans to fetch.
     */
    orderBy?: PemesananOrderByWithRelationInput | PemesananOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pemesanans.
     */
    cursor?: PemesananWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pemesanans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pemesanans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pemesanans.
     */
    distinct?: PemesananScalarFieldEnum | PemesananScalarFieldEnum[]
  }

  /**
   * Pemesanan create
   */
  export type PemesananCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    /**
     * The data needed to create a Pemesanan.
     */
    data: XOR<PemesananCreateInput, PemesananUncheckedCreateInput>
  }

  /**
   * Pemesanan createMany
   */
  export type PemesananCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pemesanans.
     */
    data: PemesananCreateManyInput | PemesananCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pemesanan createManyAndReturn
   */
  export type PemesananCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * The data used to create many Pemesanans.
     */
    data: PemesananCreateManyInput | PemesananCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pemesanan update
   */
  export type PemesananUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    /**
     * The data needed to update a Pemesanan.
     */
    data: XOR<PemesananUpdateInput, PemesananUncheckedUpdateInput>
    /**
     * Choose, which Pemesanan to update.
     */
    where: PemesananWhereUniqueInput
  }

  /**
   * Pemesanan updateMany
   */
  export type PemesananUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pemesanans.
     */
    data: XOR<PemesananUpdateManyMutationInput, PemesananUncheckedUpdateManyInput>
    /**
     * Filter which Pemesanans to update
     */
    where?: PemesananWhereInput
    /**
     * Limit how many Pemesanans to update.
     */
    limit?: number
  }

  /**
   * Pemesanan updateManyAndReturn
   */
  export type PemesananUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * The data used to update Pemesanans.
     */
    data: XOR<PemesananUpdateManyMutationInput, PemesananUncheckedUpdateManyInput>
    /**
     * Filter which Pemesanans to update
     */
    where?: PemesananWhereInput
    /**
     * Limit how many Pemesanans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pemesanan upsert
   */
  export type PemesananUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    /**
     * The filter to search for the Pemesanan to update in case it exists.
     */
    where: PemesananWhereUniqueInput
    /**
     * In case the Pemesanan found by the `where` argument doesn't exist, create a new Pemesanan with this data.
     */
    create: XOR<PemesananCreateInput, PemesananUncheckedCreateInput>
    /**
     * In case the Pemesanan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PemesananUpdateInput, PemesananUncheckedUpdateInput>
  }

  /**
   * Pemesanan delete
   */
  export type PemesananDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    /**
     * Filter which Pemesanan to delete.
     */
    where: PemesananWhereUniqueInput
  }

  /**
   * Pemesanan deleteMany
   */
  export type PemesananDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pemesanans to delete
     */
    where?: PemesananWhereInput
    /**
     * Limit how many Pemesanans to delete.
     */
    limit?: number
  }

  /**
   * Pemesanan.pembayaran
   */
  export type Pemesanan$pembayaranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    where?: PembayaranWhereInput
  }

  /**
   * Pemesanan without action
   */
  export type PemesananDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
  }


  /**
   * Model Pembayaran
   */

  export type AggregatePembayaran = {
    _count: PembayaranCountAggregateOutputType | null
    _min: PembayaranMinAggregateOutputType | null
    _max: PembayaranMaxAggregateOutputType | null
  }

  export type PembayaranMinAggregateOutputType = {
    id: string | null
    metode_bayar: string | null
    bukti: string | null
    status: $Enums.StatusPembayaran | null
    tgl_bayar: Date | null
    created_at: Date | null
    updated_at: Date | null
    pemesanan_id: string | null
  }

  export type PembayaranMaxAggregateOutputType = {
    id: string | null
    metode_bayar: string | null
    bukti: string | null
    status: $Enums.StatusPembayaran | null
    tgl_bayar: Date | null
    created_at: Date | null
    updated_at: Date | null
    pemesanan_id: string | null
  }

  export type PembayaranCountAggregateOutputType = {
    id: number
    metode_bayar: number
    bukti: number
    status: number
    tgl_bayar: number
    created_at: number
    updated_at: number
    pemesanan_id: number
    _all: number
  }


  export type PembayaranMinAggregateInputType = {
    id?: true
    metode_bayar?: true
    bukti?: true
    status?: true
    tgl_bayar?: true
    created_at?: true
    updated_at?: true
    pemesanan_id?: true
  }

  export type PembayaranMaxAggregateInputType = {
    id?: true
    metode_bayar?: true
    bukti?: true
    status?: true
    tgl_bayar?: true
    created_at?: true
    updated_at?: true
    pemesanan_id?: true
  }

  export type PembayaranCountAggregateInputType = {
    id?: true
    metode_bayar?: true
    bukti?: true
    status?: true
    tgl_bayar?: true
    created_at?: true
    updated_at?: true
    pemesanan_id?: true
    _all?: true
  }

  export type PembayaranAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pembayaran to aggregate.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pembayarans
    **/
    _count?: true | PembayaranCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PembayaranMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PembayaranMaxAggregateInputType
  }

  export type GetPembayaranAggregateType<T extends PembayaranAggregateArgs> = {
        [P in keyof T & keyof AggregatePembayaran]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePembayaran[P]>
      : GetScalarType<T[P], AggregatePembayaran[P]>
  }




  export type PembayaranGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PembayaranWhereInput
    orderBy?: PembayaranOrderByWithAggregationInput | PembayaranOrderByWithAggregationInput[]
    by: PembayaranScalarFieldEnum[] | PembayaranScalarFieldEnum
    having?: PembayaranScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PembayaranCountAggregateInputType | true
    _min?: PembayaranMinAggregateInputType
    _max?: PembayaranMaxAggregateInputType
  }

  export type PembayaranGroupByOutputType = {
    id: string
    metode_bayar: string
    bukti: string | null
    status: $Enums.StatusPembayaran
    tgl_bayar: Date | null
    created_at: Date
    updated_at: Date
    pemesanan_id: string
    _count: PembayaranCountAggregateOutputType | null
    _min: PembayaranMinAggregateOutputType | null
    _max: PembayaranMaxAggregateOutputType | null
  }

  type GetPembayaranGroupByPayload<T extends PembayaranGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PembayaranGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PembayaranGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PembayaranGroupByOutputType[P]>
            : GetScalarType<T[P], PembayaranGroupByOutputType[P]>
        }
      >
    >


  export type PembayaranSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metode_bayar?: boolean
    bukti?: boolean
    status?: boolean
    tgl_bayar?: boolean
    created_at?: boolean
    updated_at?: boolean
    pemesanan_id?: boolean
    pemesanan?: boolean | PemesananDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pembayaran"]>

  export type PembayaranSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metode_bayar?: boolean
    bukti?: boolean
    status?: boolean
    tgl_bayar?: boolean
    created_at?: boolean
    updated_at?: boolean
    pemesanan_id?: boolean
    pemesanan?: boolean | PemesananDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pembayaran"]>

  export type PembayaranSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metode_bayar?: boolean
    bukti?: boolean
    status?: boolean
    tgl_bayar?: boolean
    created_at?: boolean
    updated_at?: boolean
    pemesanan_id?: boolean
    pemesanan?: boolean | PemesananDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pembayaran"]>

  export type PembayaranSelectScalar = {
    id?: boolean
    metode_bayar?: boolean
    bukti?: boolean
    status?: boolean
    tgl_bayar?: boolean
    created_at?: boolean
    updated_at?: boolean
    pemesanan_id?: boolean
  }

  export type PembayaranOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "metode_bayar" | "bukti" | "status" | "tgl_bayar" | "created_at" | "updated_at" | "pemesanan_id", ExtArgs["result"]["pembayaran"]>
  export type PembayaranInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pemesanan?: boolean | PemesananDefaultArgs<ExtArgs>
  }
  export type PembayaranIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pemesanan?: boolean | PemesananDefaultArgs<ExtArgs>
  }
  export type PembayaranIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pemesanan?: boolean | PemesananDefaultArgs<ExtArgs>
  }

  export type $PembayaranPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pembayaran"
    objects: {
      pemesanan: Prisma.$PemesananPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      metode_bayar: string
      bukti: string | null
      status: $Enums.StatusPembayaran
      tgl_bayar: Date | null
      created_at: Date
      updated_at: Date
      pemesanan_id: string
    }, ExtArgs["result"]["pembayaran"]>
    composites: {}
  }

  type PembayaranGetPayload<S extends boolean | null | undefined | PembayaranDefaultArgs> = $Result.GetResult<Prisma.$PembayaranPayload, S>

  type PembayaranCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PembayaranFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PembayaranCountAggregateInputType | true
    }

  export interface PembayaranDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pembayaran'], meta: { name: 'Pembayaran' } }
    /**
     * Find zero or one Pembayaran that matches the filter.
     * @param {PembayaranFindUniqueArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PembayaranFindUniqueArgs>(args: SelectSubset<T, PembayaranFindUniqueArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pembayaran that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PembayaranFindUniqueOrThrowArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PembayaranFindUniqueOrThrowArgs>(args: SelectSubset<T, PembayaranFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pembayaran that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranFindFirstArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PembayaranFindFirstArgs>(args?: SelectSubset<T, PembayaranFindFirstArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pembayaran that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranFindFirstOrThrowArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PembayaranFindFirstOrThrowArgs>(args?: SelectSubset<T, PembayaranFindFirstOrThrowArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pembayarans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pembayarans
     * const pembayarans = await prisma.pembayaran.findMany()
     * 
     * // Get first 10 Pembayarans
     * const pembayarans = await prisma.pembayaran.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pembayaranWithIdOnly = await prisma.pembayaran.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PembayaranFindManyArgs>(args?: SelectSubset<T, PembayaranFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pembayaran.
     * @param {PembayaranCreateArgs} args - Arguments to create a Pembayaran.
     * @example
     * // Create one Pembayaran
     * const Pembayaran = await prisma.pembayaran.create({
     *   data: {
     *     // ... data to create a Pembayaran
     *   }
     * })
     * 
     */
    create<T extends PembayaranCreateArgs>(args: SelectSubset<T, PembayaranCreateArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pembayarans.
     * @param {PembayaranCreateManyArgs} args - Arguments to create many Pembayarans.
     * @example
     * // Create many Pembayarans
     * const pembayaran = await prisma.pembayaran.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PembayaranCreateManyArgs>(args?: SelectSubset<T, PembayaranCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pembayarans and returns the data saved in the database.
     * @param {PembayaranCreateManyAndReturnArgs} args - Arguments to create many Pembayarans.
     * @example
     * // Create many Pembayarans
     * const pembayaran = await prisma.pembayaran.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pembayarans and only return the `id`
     * const pembayaranWithIdOnly = await prisma.pembayaran.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PembayaranCreateManyAndReturnArgs>(args?: SelectSubset<T, PembayaranCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pembayaran.
     * @param {PembayaranDeleteArgs} args - Arguments to delete one Pembayaran.
     * @example
     * // Delete one Pembayaran
     * const Pembayaran = await prisma.pembayaran.delete({
     *   where: {
     *     // ... filter to delete one Pembayaran
     *   }
     * })
     * 
     */
    delete<T extends PembayaranDeleteArgs>(args: SelectSubset<T, PembayaranDeleteArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pembayaran.
     * @param {PembayaranUpdateArgs} args - Arguments to update one Pembayaran.
     * @example
     * // Update one Pembayaran
     * const pembayaran = await prisma.pembayaran.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PembayaranUpdateArgs>(args: SelectSubset<T, PembayaranUpdateArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pembayarans.
     * @param {PembayaranDeleteManyArgs} args - Arguments to filter Pembayarans to delete.
     * @example
     * // Delete a few Pembayarans
     * const { count } = await prisma.pembayaran.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PembayaranDeleteManyArgs>(args?: SelectSubset<T, PembayaranDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pembayarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pembayarans
     * const pembayaran = await prisma.pembayaran.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PembayaranUpdateManyArgs>(args: SelectSubset<T, PembayaranUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pembayarans and returns the data updated in the database.
     * @param {PembayaranUpdateManyAndReturnArgs} args - Arguments to update many Pembayarans.
     * @example
     * // Update many Pembayarans
     * const pembayaran = await prisma.pembayaran.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pembayarans and only return the `id`
     * const pembayaranWithIdOnly = await prisma.pembayaran.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PembayaranUpdateManyAndReturnArgs>(args: SelectSubset<T, PembayaranUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pembayaran.
     * @param {PembayaranUpsertArgs} args - Arguments to update or create a Pembayaran.
     * @example
     * // Update or create a Pembayaran
     * const pembayaran = await prisma.pembayaran.upsert({
     *   create: {
     *     // ... data to create a Pembayaran
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pembayaran we want to update
     *   }
     * })
     */
    upsert<T extends PembayaranUpsertArgs>(args: SelectSubset<T, PembayaranUpsertArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pembayarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranCountArgs} args - Arguments to filter Pembayarans to count.
     * @example
     * // Count the number of Pembayarans
     * const count = await prisma.pembayaran.count({
     *   where: {
     *     // ... the filter for the Pembayarans we want to count
     *   }
     * })
    **/
    count<T extends PembayaranCountArgs>(
      args?: Subset<T, PembayaranCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PembayaranCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pembayaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PembayaranAggregateArgs>(args: Subset<T, PembayaranAggregateArgs>): Prisma.PrismaPromise<GetPembayaranAggregateType<T>>

    /**
     * Group by Pembayaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranGroupByArgs} args - Group by arguments.
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
      T extends PembayaranGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PembayaranGroupByArgs['orderBy'] }
        : { orderBy?: PembayaranGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PembayaranGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPembayaranGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pembayaran model
   */
  readonly fields: PembayaranFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pembayaran.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PembayaranClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pemesanan<T extends PemesananDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PemesananDefaultArgs<ExtArgs>>): Prisma__PemesananClient<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pembayaran model
   */
  interface PembayaranFieldRefs {
    readonly id: FieldRef<"Pembayaran", 'String'>
    readonly metode_bayar: FieldRef<"Pembayaran", 'String'>
    readonly bukti: FieldRef<"Pembayaran", 'String'>
    readonly status: FieldRef<"Pembayaran", 'StatusPembayaran'>
    readonly tgl_bayar: FieldRef<"Pembayaran", 'DateTime'>
    readonly created_at: FieldRef<"Pembayaran", 'DateTime'>
    readonly updated_at: FieldRef<"Pembayaran", 'DateTime'>
    readonly pemesanan_id: FieldRef<"Pembayaran", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pembayaran findUnique
   */
  export type PembayaranFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran findUniqueOrThrow
   */
  export type PembayaranFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran findFirst
   */
  export type PembayaranFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pembayarans.
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pembayarans.
     */
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * Pembayaran findFirstOrThrow
   */
  export type PembayaranFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pembayarans.
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pembayarans.
     */
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * Pembayaran findMany
   */
  export type PembayaranFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayarans to fetch.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pembayarans.
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pembayarans.
     */
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * Pembayaran create
   */
  export type PembayaranCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * The data needed to create a Pembayaran.
     */
    data: XOR<PembayaranCreateInput, PembayaranUncheckedCreateInput>
  }

  /**
   * Pembayaran createMany
   */
  export type PembayaranCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pembayarans.
     */
    data: PembayaranCreateManyInput | PembayaranCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pembayaran createManyAndReturn
   */
  export type PembayaranCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * The data used to create many Pembayarans.
     */
    data: PembayaranCreateManyInput | PembayaranCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pembayaran update
   */
  export type PembayaranUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * The data needed to update a Pembayaran.
     */
    data: XOR<PembayaranUpdateInput, PembayaranUncheckedUpdateInput>
    /**
     * Choose, which Pembayaran to update.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran updateMany
   */
  export type PembayaranUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pembayarans.
     */
    data: XOR<PembayaranUpdateManyMutationInput, PembayaranUncheckedUpdateManyInput>
    /**
     * Filter which Pembayarans to update
     */
    where?: PembayaranWhereInput
    /**
     * Limit how many Pembayarans to update.
     */
    limit?: number
  }

  /**
   * Pembayaran updateManyAndReturn
   */
  export type PembayaranUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * The data used to update Pembayarans.
     */
    data: XOR<PembayaranUpdateManyMutationInput, PembayaranUncheckedUpdateManyInput>
    /**
     * Filter which Pembayarans to update
     */
    where?: PembayaranWhereInput
    /**
     * Limit how many Pembayarans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pembayaran upsert
   */
  export type PembayaranUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * The filter to search for the Pembayaran to update in case it exists.
     */
    where: PembayaranWhereUniqueInput
    /**
     * In case the Pembayaran found by the `where` argument doesn't exist, create a new Pembayaran with this data.
     */
    create: XOR<PembayaranCreateInput, PembayaranUncheckedCreateInput>
    /**
     * In case the Pembayaran was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PembayaranUpdateInput, PembayaranUncheckedUpdateInput>
  }

  /**
   * Pembayaran delete
   */
  export type PembayaranDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter which Pembayaran to delete.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran deleteMany
   */
  export type PembayaranDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pembayarans to delete
     */
    where?: PembayaranWhereInput
    /**
     * Limit how many Pembayarans to delete.
     */
    limit?: number
  }

  /**
   * Pembayaran without action
   */
  export type PembayaranDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
  }


  /**
   * Model Penghuni
   */

  export type AggregatePenghuni = {
    _count: PenghuniCountAggregateOutputType | null
    _min: PenghuniMinAggregateOutputType | null
    _max: PenghuniMaxAggregateOutputType | null
  }

  export type PenghuniMinAggregateOutputType = {
    id: string | null
    tgl_mulai: Date | null
    tgl_berakhir: Date | null
    status_sewa: $Enums.StatusSewa | null
    created_at: Date | null
    updated_at: Date | null
    user_id: string | null
    kamar_id: string | null
  }

  export type PenghuniMaxAggregateOutputType = {
    id: string | null
    tgl_mulai: Date | null
    tgl_berakhir: Date | null
    status_sewa: $Enums.StatusSewa | null
    created_at: Date | null
    updated_at: Date | null
    user_id: string | null
    kamar_id: string | null
  }

  export type PenghuniCountAggregateOutputType = {
    id: number
    tgl_mulai: number
    tgl_berakhir: number
    status_sewa: number
    created_at: number
    updated_at: number
    user_id: number
    kamar_id: number
    _all: number
  }


  export type PenghuniMinAggregateInputType = {
    id?: true
    tgl_mulai?: true
    tgl_berakhir?: true
    status_sewa?: true
    created_at?: true
    updated_at?: true
    user_id?: true
    kamar_id?: true
  }

  export type PenghuniMaxAggregateInputType = {
    id?: true
    tgl_mulai?: true
    tgl_berakhir?: true
    status_sewa?: true
    created_at?: true
    updated_at?: true
    user_id?: true
    kamar_id?: true
  }

  export type PenghuniCountAggregateInputType = {
    id?: true
    tgl_mulai?: true
    tgl_berakhir?: true
    status_sewa?: true
    created_at?: true
    updated_at?: true
    user_id?: true
    kamar_id?: true
    _all?: true
  }

  export type PenghuniAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Penghuni to aggregate.
     */
    where?: PenghuniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penghunis to fetch.
     */
    orderBy?: PenghuniOrderByWithRelationInput | PenghuniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PenghuniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penghunis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penghunis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Penghunis
    **/
    _count?: true | PenghuniCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PenghuniMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PenghuniMaxAggregateInputType
  }

  export type GetPenghuniAggregateType<T extends PenghuniAggregateArgs> = {
        [P in keyof T & keyof AggregatePenghuni]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePenghuni[P]>
      : GetScalarType<T[P], AggregatePenghuni[P]>
  }




  export type PenghuniGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PenghuniWhereInput
    orderBy?: PenghuniOrderByWithAggregationInput | PenghuniOrderByWithAggregationInput[]
    by: PenghuniScalarFieldEnum[] | PenghuniScalarFieldEnum
    having?: PenghuniScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PenghuniCountAggregateInputType | true
    _min?: PenghuniMinAggregateInputType
    _max?: PenghuniMaxAggregateInputType
  }

  export type PenghuniGroupByOutputType = {
    id: string
    tgl_mulai: Date
    tgl_berakhir: Date | null
    status_sewa: $Enums.StatusSewa
    created_at: Date
    updated_at: Date
    user_id: string
    kamar_id: string | null
    _count: PenghuniCountAggregateOutputType | null
    _min: PenghuniMinAggregateOutputType | null
    _max: PenghuniMaxAggregateOutputType | null
  }

  type GetPenghuniGroupByPayload<T extends PenghuniGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PenghuniGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PenghuniGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PenghuniGroupByOutputType[P]>
            : GetScalarType<T[P], PenghuniGroupByOutputType[P]>
        }
      >
    >


  export type PenghuniSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tgl_mulai?: boolean
    tgl_berakhir?: boolean
    status_sewa?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_id?: boolean
    kamar_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    kamar?: boolean | Penghuni$kamarArgs<ExtArgs>
    pemesanan?: boolean | Penghuni$pemesananArgs<ExtArgs>
    komplain?: boolean | Penghuni$komplainArgs<ExtArgs>
    _count?: boolean | PenghuniCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["penghuni"]>

  export type PenghuniSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tgl_mulai?: boolean
    tgl_berakhir?: boolean
    status_sewa?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_id?: boolean
    kamar_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    kamar?: boolean | Penghuni$kamarArgs<ExtArgs>
  }, ExtArgs["result"]["penghuni"]>

  export type PenghuniSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tgl_mulai?: boolean
    tgl_berakhir?: boolean
    status_sewa?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_id?: boolean
    kamar_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    kamar?: boolean | Penghuni$kamarArgs<ExtArgs>
  }, ExtArgs["result"]["penghuni"]>

  export type PenghuniSelectScalar = {
    id?: boolean
    tgl_mulai?: boolean
    tgl_berakhir?: boolean
    status_sewa?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_id?: boolean
    kamar_id?: boolean
  }

  export type PenghuniOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tgl_mulai" | "tgl_berakhir" | "status_sewa" | "created_at" | "updated_at" | "user_id" | "kamar_id", ExtArgs["result"]["penghuni"]>
  export type PenghuniInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    kamar?: boolean | Penghuni$kamarArgs<ExtArgs>
    pemesanan?: boolean | Penghuni$pemesananArgs<ExtArgs>
    komplain?: boolean | Penghuni$komplainArgs<ExtArgs>
    _count?: boolean | PenghuniCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PenghuniIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    kamar?: boolean | Penghuni$kamarArgs<ExtArgs>
  }
  export type PenghuniIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    kamar?: boolean | Penghuni$kamarArgs<ExtArgs>
  }

  export type $PenghuniPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Penghuni"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      kamar: Prisma.$KamarPayload<ExtArgs> | null
      pemesanan: Prisma.$PemesananPayload<ExtArgs>[]
      komplain: Prisma.$KomplainPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tgl_mulai: Date
      tgl_berakhir: Date | null
      status_sewa: $Enums.StatusSewa
      created_at: Date
      updated_at: Date
      user_id: string
      kamar_id: string | null
    }, ExtArgs["result"]["penghuni"]>
    composites: {}
  }

  type PenghuniGetPayload<S extends boolean | null | undefined | PenghuniDefaultArgs> = $Result.GetResult<Prisma.$PenghuniPayload, S>

  type PenghuniCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PenghuniFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PenghuniCountAggregateInputType | true
    }

  export interface PenghuniDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Penghuni'], meta: { name: 'Penghuni' } }
    /**
     * Find zero or one Penghuni that matches the filter.
     * @param {PenghuniFindUniqueArgs} args - Arguments to find a Penghuni
     * @example
     * // Get one Penghuni
     * const penghuni = await prisma.penghuni.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PenghuniFindUniqueArgs>(args: SelectSubset<T, PenghuniFindUniqueArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Penghuni that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PenghuniFindUniqueOrThrowArgs} args - Arguments to find a Penghuni
     * @example
     * // Get one Penghuni
     * const penghuni = await prisma.penghuni.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PenghuniFindUniqueOrThrowArgs>(args: SelectSubset<T, PenghuniFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Penghuni that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenghuniFindFirstArgs} args - Arguments to find a Penghuni
     * @example
     * // Get one Penghuni
     * const penghuni = await prisma.penghuni.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PenghuniFindFirstArgs>(args?: SelectSubset<T, PenghuniFindFirstArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Penghuni that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenghuniFindFirstOrThrowArgs} args - Arguments to find a Penghuni
     * @example
     * // Get one Penghuni
     * const penghuni = await prisma.penghuni.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PenghuniFindFirstOrThrowArgs>(args?: SelectSubset<T, PenghuniFindFirstOrThrowArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Penghunis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenghuniFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Penghunis
     * const penghunis = await prisma.penghuni.findMany()
     * 
     * // Get first 10 Penghunis
     * const penghunis = await prisma.penghuni.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const penghuniWithIdOnly = await prisma.penghuni.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PenghuniFindManyArgs>(args?: SelectSubset<T, PenghuniFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Penghuni.
     * @param {PenghuniCreateArgs} args - Arguments to create a Penghuni.
     * @example
     * // Create one Penghuni
     * const Penghuni = await prisma.penghuni.create({
     *   data: {
     *     // ... data to create a Penghuni
     *   }
     * })
     * 
     */
    create<T extends PenghuniCreateArgs>(args: SelectSubset<T, PenghuniCreateArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Penghunis.
     * @param {PenghuniCreateManyArgs} args - Arguments to create many Penghunis.
     * @example
     * // Create many Penghunis
     * const penghuni = await prisma.penghuni.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PenghuniCreateManyArgs>(args?: SelectSubset<T, PenghuniCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Penghunis and returns the data saved in the database.
     * @param {PenghuniCreateManyAndReturnArgs} args - Arguments to create many Penghunis.
     * @example
     * // Create many Penghunis
     * const penghuni = await prisma.penghuni.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Penghunis and only return the `id`
     * const penghuniWithIdOnly = await prisma.penghuni.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PenghuniCreateManyAndReturnArgs>(args?: SelectSubset<T, PenghuniCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Penghuni.
     * @param {PenghuniDeleteArgs} args - Arguments to delete one Penghuni.
     * @example
     * // Delete one Penghuni
     * const Penghuni = await prisma.penghuni.delete({
     *   where: {
     *     // ... filter to delete one Penghuni
     *   }
     * })
     * 
     */
    delete<T extends PenghuniDeleteArgs>(args: SelectSubset<T, PenghuniDeleteArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Penghuni.
     * @param {PenghuniUpdateArgs} args - Arguments to update one Penghuni.
     * @example
     * // Update one Penghuni
     * const penghuni = await prisma.penghuni.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PenghuniUpdateArgs>(args: SelectSubset<T, PenghuniUpdateArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Penghunis.
     * @param {PenghuniDeleteManyArgs} args - Arguments to filter Penghunis to delete.
     * @example
     * // Delete a few Penghunis
     * const { count } = await prisma.penghuni.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PenghuniDeleteManyArgs>(args?: SelectSubset<T, PenghuniDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Penghunis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenghuniUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Penghunis
     * const penghuni = await prisma.penghuni.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PenghuniUpdateManyArgs>(args: SelectSubset<T, PenghuniUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Penghunis and returns the data updated in the database.
     * @param {PenghuniUpdateManyAndReturnArgs} args - Arguments to update many Penghunis.
     * @example
     * // Update many Penghunis
     * const penghuni = await prisma.penghuni.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Penghunis and only return the `id`
     * const penghuniWithIdOnly = await prisma.penghuni.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PenghuniUpdateManyAndReturnArgs>(args: SelectSubset<T, PenghuniUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Penghuni.
     * @param {PenghuniUpsertArgs} args - Arguments to update or create a Penghuni.
     * @example
     * // Update or create a Penghuni
     * const penghuni = await prisma.penghuni.upsert({
     *   create: {
     *     // ... data to create a Penghuni
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Penghuni we want to update
     *   }
     * })
     */
    upsert<T extends PenghuniUpsertArgs>(args: SelectSubset<T, PenghuniUpsertArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Penghunis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenghuniCountArgs} args - Arguments to filter Penghunis to count.
     * @example
     * // Count the number of Penghunis
     * const count = await prisma.penghuni.count({
     *   where: {
     *     // ... the filter for the Penghunis we want to count
     *   }
     * })
    **/
    count<T extends PenghuniCountArgs>(
      args?: Subset<T, PenghuniCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PenghuniCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Penghuni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenghuniAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PenghuniAggregateArgs>(args: Subset<T, PenghuniAggregateArgs>): Prisma.PrismaPromise<GetPenghuniAggregateType<T>>

    /**
     * Group by Penghuni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenghuniGroupByArgs} args - Group by arguments.
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
      T extends PenghuniGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PenghuniGroupByArgs['orderBy'] }
        : { orderBy?: PenghuniGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PenghuniGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPenghuniGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Penghuni model
   */
  readonly fields: PenghuniFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Penghuni.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PenghuniClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    kamar<T extends Penghuni$kamarArgs<ExtArgs> = {}>(args?: Subset<T, Penghuni$kamarArgs<ExtArgs>>): Prisma__KamarClient<$Result.GetResult<Prisma.$KamarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pemesanan<T extends Penghuni$pemesananArgs<ExtArgs> = {}>(args?: Subset<T, Penghuni$pemesananArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PemesananPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    komplain<T extends Penghuni$komplainArgs<ExtArgs> = {}>(args?: Subset<T, Penghuni$komplainArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Penghuni model
   */
  interface PenghuniFieldRefs {
    readonly id: FieldRef<"Penghuni", 'String'>
    readonly tgl_mulai: FieldRef<"Penghuni", 'DateTime'>
    readonly tgl_berakhir: FieldRef<"Penghuni", 'DateTime'>
    readonly status_sewa: FieldRef<"Penghuni", 'StatusSewa'>
    readonly created_at: FieldRef<"Penghuni", 'DateTime'>
    readonly updated_at: FieldRef<"Penghuni", 'DateTime'>
    readonly user_id: FieldRef<"Penghuni", 'String'>
    readonly kamar_id: FieldRef<"Penghuni", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Penghuni findUnique
   */
  export type PenghuniFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    /**
     * Filter, which Penghuni to fetch.
     */
    where: PenghuniWhereUniqueInput
  }

  /**
   * Penghuni findUniqueOrThrow
   */
  export type PenghuniFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    /**
     * Filter, which Penghuni to fetch.
     */
    where: PenghuniWhereUniqueInput
  }

  /**
   * Penghuni findFirst
   */
  export type PenghuniFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    /**
     * Filter, which Penghuni to fetch.
     */
    where?: PenghuniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penghunis to fetch.
     */
    orderBy?: PenghuniOrderByWithRelationInput | PenghuniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Penghunis.
     */
    cursor?: PenghuniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penghunis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penghunis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Penghunis.
     */
    distinct?: PenghuniScalarFieldEnum | PenghuniScalarFieldEnum[]
  }

  /**
   * Penghuni findFirstOrThrow
   */
  export type PenghuniFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    /**
     * Filter, which Penghuni to fetch.
     */
    where?: PenghuniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penghunis to fetch.
     */
    orderBy?: PenghuniOrderByWithRelationInput | PenghuniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Penghunis.
     */
    cursor?: PenghuniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penghunis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penghunis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Penghunis.
     */
    distinct?: PenghuniScalarFieldEnum | PenghuniScalarFieldEnum[]
  }

  /**
   * Penghuni findMany
   */
  export type PenghuniFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    /**
     * Filter, which Penghunis to fetch.
     */
    where?: PenghuniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penghunis to fetch.
     */
    orderBy?: PenghuniOrderByWithRelationInput | PenghuniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Penghunis.
     */
    cursor?: PenghuniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penghunis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penghunis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Penghunis.
     */
    distinct?: PenghuniScalarFieldEnum | PenghuniScalarFieldEnum[]
  }

  /**
   * Penghuni create
   */
  export type PenghuniCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    /**
     * The data needed to create a Penghuni.
     */
    data: XOR<PenghuniCreateInput, PenghuniUncheckedCreateInput>
  }

  /**
   * Penghuni createMany
   */
  export type PenghuniCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Penghunis.
     */
    data: PenghuniCreateManyInput | PenghuniCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Penghuni createManyAndReturn
   */
  export type PenghuniCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * The data used to create many Penghunis.
     */
    data: PenghuniCreateManyInput | PenghuniCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Penghuni update
   */
  export type PenghuniUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    /**
     * The data needed to update a Penghuni.
     */
    data: XOR<PenghuniUpdateInput, PenghuniUncheckedUpdateInput>
    /**
     * Choose, which Penghuni to update.
     */
    where: PenghuniWhereUniqueInput
  }

  /**
   * Penghuni updateMany
   */
  export type PenghuniUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Penghunis.
     */
    data: XOR<PenghuniUpdateManyMutationInput, PenghuniUncheckedUpdateManyInput>
    /**
     * Filter which Penghunis to update
     */
    where?: PenghuniWhereInput
    /**
     * Limit how many Penghunis to update.
     */
    limit?: number
  }

  /**
   * Penghuni updateManyAndReturn
   */
  export type PenghuniUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * The data used to update Penghunis.
     */
    data: XOR<PenghuniUpdateManyMutationInput, PenghuniUncheckedUpdateManyInput>
    /**
     * Filter which Penghunis to update
     */
    where?: PenghuniWhereInput
    /**
     * Limit how many Penghunis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Penghuni upsert
   */
  export type PenghuniUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    /**
     * The filter to search for the Penghuni to update in case it exists.
     */
    where: PenghuniWhereUniqueInput
    /**
     * In case the Penghuni found by the `where` argument doesn't exist, create a new Penghuni with this data.
     */
    create: XOR<PenghuniCreateInput, PenghuniUncheckedCreateInput>
    /**
     * In case the Penghuni was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PenghuniUpdateInput, PenghuniUncheckedUpdateInput>
  }

  /**
   * Penghuni delete
   */
  export type PenghuniDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
    /**
     * Filter which Penghuni to delete.
     */
    where: PenghuniWhereUniqueInput
  }

  /**
   * Penghuni deleteMany
   */
  export type PenghuniDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Penghunis to delete
     */
    where?: PenghuniWhereInput
    /**
     * Limit how many Penghunis to delete.
     */
    limit?: number
  }

  /**
   * Penghuni.kamar
   */
  export type Penghuni$kamarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kamar
     */
    select?: KamarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kamar
     */
    omit?: KamarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KamarInclude<ExtArgs> | null
    where?: KamarWhereInput
  }

  /**
   * Penghuni.pemesanan
   */
  export type Penghuni$pemesananArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pemesanan
     */
    select?: PemesananSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pemesanan
     */
    omit?: PemesananOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PemesananInclude<ExtArgs> | null
    where?: PemesananWhereInput
    orderBy?: PemesananOrderByWithRelationInput | PemesananOrderByWithRelationInput[]
    cursor?: PemesananWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PemesananScalarFieldEnum | PemesananScalarFieldEnum[]
  }

  /**
   * Penghuni.komplain
   */
  export type Penghuni$komplainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    where?: KomplainWhereInput
    orderBy?: KomplainOrderByWithRelationInput | KomplainOrderByWithRelationInput[]
    cursor?: KomplainWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KomplainScalarFieldEnum | KomplainScalarFieldEnum[]
  }

  /**
   * Penghuni without action
   */
  export type PenghuniDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penghuni
     */
    select?: PenghuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penghuni
     */
    omit?: PenghuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenghuniInclude<ExtArgs> | null
  }


  /**
   * Model Operator
   */

  export type AggregateOperator = {
    _count: OperatorCountAggregateOutputType | null
    _min: OperatorMinAggregateOutputType | null
    _max: OperatorMaxAggregateOutputType | null
  }

  export type OperatorMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    user_id: string | null
    properti_id: string | null
  }

  export type OperatorMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    user_id: string | null
    properti_id: string | null
  }

  export type OperatorCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    user_id: number
    properti_id: number
    _all: number
  }


  export type OperatorMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    user_id?: true
    properti_id?: true
  }

  export type OperatorMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    user_id?: true
    properti_id?: true
  }

  export type OperatorCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    user_id?: true
    properti_id?: true
    _all?: true
  }

  export type OperatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Operator to aggregate.
     */
    where?: OperatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operators to fetch.
     */
    orderBy?: OperatorOrderByWithRelationInput | OperatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OperatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Operators
    **/
    _count?: true | OperatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OperatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OperatorMaxAggregateInputType
  }

  export type GetOperatorAggregateType<T extends OperatorAggregateArgs> = {
        [P in keyof T & keyof AggregateOperator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOperator[P]>
      : GetScalarType<T[P], AggregateOperator[P]>
  }




  export type OperatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperatorWhereInput
    orderBy?: OperatorOrderByWithAggregationInput | OperatorOrderByWithAggregationInput[]
    by: OperatorScalarFieldEnum[] | OperatorScalarFieldEnum
    having?: OperatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OperatorCountAggregateInputType | true
    _min?: OperatorMinAggregateInputType
    _max?: OperatorMaxAggregateInputType
  }

  export type OperatorGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    user_id: string
    properti_id: string
    _count: OperatorCountAggregateOutputType | null
    _min: OperatorMinAggregateOutputType | null
    _max: OperatorMaxAggregateOutputType | null
  }

  type GetOperatorGroupByPayload<T extends OperatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OperatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OperatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OperatorGroupByOutputType[P]>
            : GetScalarType<T[P], OperatorGroupByOutputType[P]>
        }
      >
    >


  export type OperatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_id?: boolean
    properti_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
    pengajuanDana?: boolean | Operator$pengajuanDanaArgs<ExtArgs>
    _count?: boolean | OperatorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operator"]>

  export type OperatorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_id?: boolean
    properti_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operator"]>

  export type OperatorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_id?: boolean
    properti_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operator"]>

  export type OperatorSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_id?: boolean
    properti_id?: boolean
  }

  export type OperatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "user_id" | "properti_id", ExtArgs["result"]["operator"]>
  export type OperatorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
    pengajuanDana?: boolean | Operator$pengajuanDanaArgs<ExtArgs>
    _count?: boolean | OperatorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OperatorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }
  export type OperatorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }

  export type $OperatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Operator"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      properti: Prisma.$PropertiPayload<ExtArgs>
      pengajuanDana: Prisma.$PengajuanDanaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      user_id: string
      properti_id: string
    }, ExtArgs["result"]["operator"]>
    composites: {}
  }

  type OperatorGetPayload<S extends boolean | null | undefined | OperatorDefaultArgs> = $Result.GetResult<Prisma.$OperatorPayload, S>

  type OperatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OperatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OperatorCountAggregateInputType | true
    }

  export interface OperatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Operator'], meta: { name: 'Operator' } }
    /**
     * Find zero or one Operator that matches the filter.
     * @param {OperatorFindUniqueArgs} args - Arguments to find a Operator
     * @example
     * // Get one Operator
     * const operator = await prisma.operator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperatorFindUniqueArgs>(args: SelectSubset<T, OperatorFindUniqueArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Operator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperatorFindUniqueOrThrowArgs} args - Arguments to find a Operator
     * @example
     * // Get one Operator
     * const operator = await prisma.operator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperatorFindUniqueOrThrowArgs>(args: SelectSubset<T, OperatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Operator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorFindFirstArgs} args - Arguments to find a Operator
     * @example
     * // Get one Operator
     * const operator = await prisma.operator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperatorFindFirstArgs>(args?: SelectSubset<T, OperatorFindFirstArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Operator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorFindFirstOrThrowArgs} args - Arguments to find a Operator
     * @example
     * // Get one Operator
     * const operator = await prisma.operator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperatorFindFirstOrThrowArgs>(args?: SelectSubset<T, OperatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Operators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Operators
     * const operators = await prisma.operator.findMany()
     * 
     * // Get first 10 Operators
     * const operators = await prisma.operator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const operatorWithIdOnly = await prisma.operator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OperatorFindManyArgs>(args?: SelectSubset<T, OperatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Operator.
     * @param {OperatorCreateArgs} args - Arguments to create a Operator.
     * @example
     * // Create one Operator
     * const Operator = await prisma.operator.create({
     *   data: {
     *     // ... data to create a Operator
     *   }
     * })
     * 
     */
    create<T extends OperatorCreateArgs>(args: SelectSubset<T, OperatorCreateArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Operators.
     * @param {OperatorCreateManyArgs} args - Arguments to create many Operators.
     * @example
     * // Create many Operators
     * const operator = await prisma.operator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OperatorCreateManyArgs>(args?: SelectSubset<T, OperatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Operators and returns the data saved in the database.
     * @param {OperatorCreateManyAndReturnArgs} args - Arguments to create many Operators.
     * @example
     * // Create many Operators
     * const operator = await prisma.operator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Operators and only return the `id`
     * const operatorWithIdOnly = await prisma.operator.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OperatorCreateManyAndReturnArgs>(args?: SelectSubset<T, OperatorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Operator.
     * @param {OperatorDeleteArgs} args - Arguments to delete one Operator.
     * @example
     * // Delete one Operator
     * const Operator = await prisma.operator.delete({
     *   where: {
     *     // ... filter to delete one Operator
     *   }
     * })
     * 
     */
    delete<T extends OperatorDeleteArgs>(args: SelectSubset<T, OperatorDeleteArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Operator.
     * @param {OperatorUpdateArgs} args - Arguments to update one Operator.
     * @example
     * // Update one Operator
     * const operator = await prisma.operator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OperatorUpdateArgs>(args: SelectSubset<T, OperatorUpdateArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Operators.
     * @param {OperatorDeleteManyArgs} args - Arguments to filter Operators to delete.
     * @example
     * // Delete a few Operators
     * const { count } = await prisma.operator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OperatorDeleteManyArgs>(args?: SelectSubset<T, OperatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Operators
     * const operator = await prisma.operator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OperatorUpdateManyArgs>(args: SelectSubset<T, OperatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operators and returns the data updated in the database.
     * @param {OperatorUpdateManyAndReturnArgs} args - Arguments to update many Operators.
     * @example
     * // Update many Operators
     * const operator = await prisma.operator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Operators and only return the `id`
     * const operatorWithIdOnly = await prisma.operator.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OperatorUpdateManyAndReturnArgs>(args: SelectSubset<T, OperatorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Operator.
     * @param {OperatorUpsertArgs} args - Arguments to update or create a Operator.
     * @example
     * // Update or create a Operator
     * const operator = await prisma.operator.upsert({
     *   create: {
     *     // ... data to create a Operator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Operator we want to update
     *   }
     * })
     */
    upsert<T extends OperatorUpsertArgs>(args: SelectSubset<T, OperatorUpsertArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Operators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorCountArgs} args - Arguments to filter Operators to count.
     * @example
     * // Count the number of Operators
     * const count = await prisma.operator.count({
     *   where: {
     *     // ... the filter for the Operators we want to count
     *   }
     * })
    **/
    count<T extends OperatorCountArgs>(
      args?: Subset<T, OperatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OperatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Operator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OperatorAggregateArgs>(args: Subset<T, OperatorAggregateArgs>): Prisma.PrismaPromise<GetOperatorAggregateType<T>>

    /**
     * Group by Operator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorGroupByArgs} args - Group by arguments.
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
      T extends OperatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OperatorGroupByArgs['orderBy'] }
        : { orderBy?: OperatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, OperatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Operator model
   */
  readonly fields: OperatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Operator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OperatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    properti<T extends PropertiDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertiDefaultArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pengajuanDana<T extends Operator$pengajuanDanaArgs<ExtArgs> = {}>(args?: Subset<T, Operator$pengajuanDanaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Operator model
   */
  interface OperatorFieldRefs {
    readonly id: FieldRef<"Operator", 'String'>
    readonly created_at: FieldRef<"Operator", 'DateTime'>
    readonly updated_at: FieldRef<"Operator", 'DateTime'>
    readonly user_id: FieldRef<"Operator", 'String'>
    readonly properti_id: FieldRef<"Operator", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Operator findUnique
   */
  export type OperatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter, which Operator to fetch.
     */
    where: OperatorWhereUniqueInput
  }

  /**
   * Operator findUniqueOrThrow
   */
  export type OperatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter, which Operator to fetch.
     */
    where: OperatorWhereUniqueInput
  }

  /**
   * Operator findFirst
   */
  export type OperatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter, which Operator to fetch.
     */
    where?: OperatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operators to fetch.
     */
    orderBy?: OperatorOrderByWithRelationInput | OperatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Operators.
     */
    cursor?: OperatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operators.
     */
    distinct?: OperatorScalarFieldEnum | OperatorScalarFieldEnum[]
  }

  /**
   * Operator findFirstOrThrow
   */
  export type OperatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter, which Operator to fetch.
     */
    where?: OperatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operators to fetch.
     */
    orderBy?: OperatorOrderByWithRelationInput | OperatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Operators.
     */
    cursor?: OperatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operators.
     */
    distinct?: OperatorScalarFieldEnum | OperatorScalarFieldEnum[]
  }

  /**
   * Operator findMany
   */
  export type OperatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter, which Operators to fetch.
     */
    where?: OperatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operators to fetch.
     */
    orderBy?: OperatorOrderByWithRelationInput | OperatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Operators.
     */
    cursor?: OperatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operators.
     */
    distinct?: OperatorScalarFieldEnum | OperatorScalarFieldEnum[]
  }

  /**
   * Operator create
   */
  export type OperatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * The data needed to create a Operator.
     */
    data: XOR<OperatorCreateInput, OperatorUncheckedCreateInput>
  }

  /**
   * Operator createMany
   */
  export type OperatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Operators.
     */
    data: OperatorCreateManyInput | OperatorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Operator createManyAndReturn
   */
  export type OperatorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * The data used to create many Operators.
     */
    data: OperatorCreateManyInput | OperatorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Operator update
   */
  export type OperatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * The data needed to update a Operator.
     */
    data: XOR<OperatorUpdateInput, OperatorUncheckedUpdateInput>
    /**
     * Choose, which Operator to update.
     */
    where: OperatorWhereUniqueInput
  }

  /**
   * Operator updateMany
   */
  export type OperatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Operators.
     */
    data: XOR<OperatorUpdateManyMutationInput, OperatorUncheckedUpdateManyInput>
    /**
     * Filter which Operators to update
     */
    where?: OperatorWhereInput
    /**
     * Limit how many Operators to update.
     */
    limit?: number
  }

  /**
   * Operator updateManyAndReturn
   */
  export type OperatorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * The data used to update Operators.
     */
    data: XOR<OperatorUpdateManyMutationInput, OperatorUncheckedUpdateManyInput>
    /**
     * Filter which Operators to update
     */
    where?: OperatorWhereInput
    /**
     * Limit how many Operators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Operator upsert
   */
  export type OperatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * The filter to search for the Operator to update in case it exists.
     */
    where: OperatorWhereUniqueInput
    /**
     * In case the Operator found by the `where` argument doesn't exist, create a new Operator with this data.
     */
    create: XOR<OperatorCreateInput, OperatorUncheckedCreateInput>
    /**
     * In case the Operator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OperatorUpdateInput, OperatorUncheckedUpdateInput>
  }

  /**
   * Operator delete
   */
  export type OperatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter which Operator to delete.
     */
    where: OperatorWhereUniqueInput
  }

  /**
   * Operator deleteMany
   */
  export type OperatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Operators to delete
     */
    where?: OperatorWhereInput
    /**
     * Limit how many Operators to delete.
     */
    limit?: number
  }

  /**
   * Operator.pengajuanDana
   */
  export type Operator$pengajuanDanaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    where?: PengajuanDanaWhereInput
    orderBy?: PengajuanDanaOrderByWithRelationInput | PengajuanDanaOrderByWithRelationInput[]
    cursor?: PengajuanDanaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PengajuanDanaScalarFieldEnum | PengajuanDanaScalarFieldEnum[]
  }

  /**
   * Operator without action
   */
  export type OperatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
  }


  /**
   * Model Komplain
   */

  export type AggregateKomplain = {
    _count: KomplainCountAggregateOutputType | null
    _min: KomplainMinAggregateOutputType | null
    _max: KomplainMaxAggregateOutputType | null
  }

  export type KomplainMinAggregateOutputType = {
    id: string | null
    masalah: string | null
    jenis: $Enums.JenisKomplain | null
    deskripsi: string | null
    foto: string | null
    status: $Enums.StatusKomplain | null
    created_at: Date | null
    updated_at: Date | null
    penghuni_id: string | null
    properti_id: string | null
  }

  export type KomplainMaxAggregateOutputType = {
    id: string | null
    masalah: string | null
    jenis: $Enums.JenisKomplain | null
    deskripsi: string | null
    foto: string | null
    status: $Enums.StatusKomplain | null
    created_at: Date | null
    updated_at: Date | null
    penghuni_id: string | null
    properti_id: string | null
  }

  export type KomplainCountAggregateOutputType = {
    id: number
    masalah: number
    jenis: number
    deskripsi: number
    foto: number
    status: number
    created_at: number
    updated_at: number
    penghuni_id: number
    properti_id: number
    _all: number
  }


  export type KomplainMinAggregateInputType = {
    id?: true
    masalah?: true
    jenis?: true
    deskripsi?: true
    foto?: true
    status?: true
    created_at?: true
    updated_at?: true
    penghuni_id?: true
    properti_id?: true
  }

  export type KomplainMaxAggregateInputType = {
    id?: true
    masalah?: true
    jenis?: true
    deskripsi?: true
    foto?: true
    status?: true
    created_at?: true
    updated_at?: true
    penghuni_id?: true
    properti_id?: true
  }

  export type KomplainCountAggregateInputType = {
    id?: true
    masalah?: true
    jenis?: true
    deskripsi?: true
    foto?: true
    status?: true
    created_at?: true
    updated_at?: true
    penghuni_id?: true
    properti_id?: true
    _all?: true
  }

  export type KomplainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Komplain to aggregate.
     */
    where?: KomplainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Komplains to fetch.
     */
    orderBy?: KomplainOrderByWithRelationInput | KomplainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KomplainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Komplains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Komplains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Komplains
    **/
    _count?: true | KomplainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KomplainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KomplainMaxAggregateInputType
  }

  export type GetKomplainAggregateType<T extends KomplainAggregateArgs> = {
        [P in keyof T & keyof AggregateKomplain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKomplain[P]>
      : GetScalarType<T[P], AggregateKomplain[P]>
  }




  export type KomplainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KomplainWhereInput
    orderBy?: KomplainOrderByWithAggregationInput | KomplainOrderByWithAggregationInput[]
    by: KomplainScalarFieldEnum[] | KomplainScalarFieldEnum
    having?: KomplainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KomplainCountAggregateInputType | true
    _min?: KomplainMinAggregateInputType
    _max?: KomplainMaxAggregateInputType
  }

  export type KomplainGroupByOutputType = {
    id: string
    masalah: string
    jenis: $Enums.JenisKomplain
    deskripsi: string
    foto: string | null
    status: $Enums.StatusKomplain
    created_at: Date
    updated_at: Date
    penghuni_id: string
    properti_id: string
    _count: KomplainCountAggregateOutputType | null
    _min: KomplainMinAggregateOutputType | null
    _max: KomplainMaxAggregateOutputType | null
  }

  type GetKomplainGroupByPayload<T extends KomplainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KomplainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KomplainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KomplainGroupByOutputType[P]>
            : GetScalarType<T[P], KomplainGroupByOutputType[P]>
        }
      >
    >


  export type KomplainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    masalah?: boolean
    jenis?: boolean
    deskripsi?: boolean
    foto?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    penghuni_id?: boolean
    properti_id?: boolean
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["komplain"]>

  export type KomplainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    masalah?: boolean
    jenis?: boolean
    deskripsi?: boolean
    foto?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    penghuni_id?: boolean
    properti_id?: boolean
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["komplain"]>

  export type KomplainSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    masalah?: boolean
    jenis?: boolean
    deskripsi?: boolean
    foto?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    penghuni_id?: boolean
    properti_id?: boolean
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["komplain"]>

  export type KomplainSelectScalar = {
    id?: boolean
    masalah?: boolean
    jenis?: boolean
    deskripsi?: boolean
    foto?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    penghuni_id?: boolean
    properti_id?: boolean
  }

  export type KomplainOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "masalah" | "jenis" | "deskripsi" | "foto" | "status" | "created_at" | "updated_at" | "penghuni_id" | "properti_id", ExtArgs["result"]["komplain"]>
  export type KomplainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }
  export type KomplainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }
  export type KomplainIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    penghuni?: boolean | PenghuniDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }

  export type $KomplainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Komplain"
    objects: {
      penghuni: Prisma.$PenghuniPayload<ExtArgs>
      properti: Prisma.$PropertiPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      masalah: string
      jenis: $Enums.JenisKomplain
      deskripsi: string
      foto: string | null
      status: $Enums.StatusKomplain
      created_at: Date
      updated_at: Date
      penghuni_id: string
      properti_id: string
    }, ExtArgs["result"]["komplain"]>
    composites: {}
  }

  type KomplainGetPayload<S extends boolean | null | undefined | KomplainDefaultArgs> = $Result.GetResult<Prisma.$KomplainPayload, S>

  type KomplainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KomplainFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KomplainCountAggregateInputType | true
    }

  export interface KomplainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Komplain'], meta: { name: 'Komplain' } }
    /**
     * Find zero or one Komplain that matches the filter.
     * @param {KomplainFindUniqueArgs} args - Arguments to find a Komplain
     * @example
     * // Get one Komplain
     * const komplain = await prisma.komplain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KomplainFindUniqueArgs>(args: SelectSubset<T, KomplainFindUniqueArgs<ExtArgs>>): Prisma__KomplainClient<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Komplain that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KomplainFindUniqueOrThrowArgs} args - Arguments to find a Komplain
     * @example
     * // Get one Komplain
     * const komplain = await prisma.komplain.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KomplainFindUniqueOrThrowArgs>(args: SelectSubset<T, KomplainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KomplainClient<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Komplain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomplainFindFirstArgs} args - Arguments to find a Komplain
     * @example
     * // Get one Komplain
     * const komplain = await prisma.komplain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KomplainFindFirstArgs>(args?: SelectSubset<T, KomplainFindFirstArgs<ExtArgs>>): Prisma__KomplainClient<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Komplain that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomplainFindFirstOrThrowArgs} args - Arguments to find a Komplain
     * @example
     * // Get one Komplain
     * const komplain = await prisma.komplain.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KomplainFindFirstOrThrowArgs>(args?: SelectSubset<T, KomplainFindFirstOrThrowArgs<ExtArgs>>): Prisma__KomplainClient<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Komplains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomplainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Komplains
     * const komplains = await prisma.komplain.findMany()
     * 
     * // Get first 10 Komplains
     * const komplains = await prisma.komplain.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const komplainWithIdOnly = await prisma.komplain.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KomplainFindManyArgs>(args?: SelectSubset<T, KomplainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Komplain.
     * @param {KomplainCreateArgs} args - Arguments to create a Komplain.
     * @example
     * // Create one Komplain
     * const Komplain = await prisma.komplain.create({
     *   data: {
     *     // ... data to create a Komplain
     *   }
     * })
     * 
     */
    create<T extends KomplainCreateArgs>(args: SelectSubset<T, KomplainCreateArgs<ExtArgs>>): Prisma__KomplainClient<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Komplains.
     * @param {KomplainCreateManyArgs} args - Arguments to create many Komplains.
     * @example
     * // Create many Komplains
     * const komplain = await prisma.komplain.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KomplainCreateManyArgs>(args?: SelectSubset<T, KomplainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Komplains and returns the data saved in the database.
     * @param {KomplainCreateManyAndReturnArgs} args - Arguments to create many Komplains.
     * @example
     * // Create many Komplains
     * const komplain = await prisma.komplain.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Komplains and only return the `id`
     * const komplainWithIdOnly = await prisma.komplain.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KomplainCreateManyAndReturnArgs>(args?: SelectSubset<T, KomplainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Komplain.
     * @param {KomplainDeleteArgs} args - Arguments to delete one Komplain.
     * @example
     * // Delete one Komplain
     * const Komplain = await prisma.komplain.delete({
     *   where: {
     *     // ... filter to delete one Komplain
     *   }
     * })
     * 
     */
    delete<T extends KomplainDeleteArgs>(args: SelectSubset<T, KomplainDeleteArgs<ExtArgs>>): Prisma__KomplainClient<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Komplain.
     * @param {KomplainUpdateArgs} args - Arguments to update one Komplain.
     * @example
     * // Update one Komplain
     * const komplain = await prisma.komplain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KomplainUpdateArgs>(args: SelectSubset<T, KomplainUpdateArgs<ExtArgs>>): Prisma__KomplainClient<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Komplains.
     * @param {KomplainDeleteManyArgs} args - Arguments to filter Komplains to delete.
     * @example
     * // Delete a few Komplains
     * const { count } = await prisma.komplain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KomplainDeleteManyArgs>(args?: SelectSubset<T, KomplainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Komplains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomplainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Komplains
     * const komplain = await prisma.komplain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KomplainUpdateManyArgs>(args: SelectSubset<T, KomplainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Komplains and returns the data updated in the database.
     * @param {KomplainUpdateManyAndReturnArgs} args - Arguments to update many Komplains.
     * @example
     * // Update many Komplains
     * const komplain = await prisma.komplain.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Komplains and only return the `id`
     * const komplainWithIdOnly = await prisma.komplain.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KomplainUpdateManyAndReturnArgs>(args: SelectSubset<T, KomplainUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Komplain.
     * @param {KomplainUpsertArgs} args - Arguments to update or create a Komplain.
     * @example
     * // Update or create a Komplain
     * const komplain = await prisma.komplain.upsert({
     *   create: {
     *     // ... data to create a Komplain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Komplain we want to update
     *   }
     * })
     */
    upsert<T extends KomplainUpsertArgs>(args: SelectSubset<T, KomplainUpsertArgs<ExtArgs>>): Prisma__KomplainClient<$Result.GetResult<Prisma.$KomplainPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Komplains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomplainCountArgs} args - Arguments to filter Komplains to count.
     * @example
     * // Count the number of Komplains
     * const count = await prisma.komplain.count({
     *   where: {
     *     // ... the filter for the Komplains we want to count
     *   }
     * })
    **/
    count<T extends KomplainCountArgs>(
      args?: Subset<T, KomplainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KomplainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Komplain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomplainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KomplainAggregateArgs>(args: Subset<T, KomplainAggregateArgs>): Prisma.PrismaPromise<GetKomplainAggregateType<T>>

    /**
     * Group by Komplain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomplainGroupByArgs} args - Group by arguments.
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
      T extends KomplainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KomplainGroupByArgs['orderBy'] }
        : { orderBy?: KomplainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, KomplainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKomplainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Komplain model
   */
  readonly fields: KomplainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Komplain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KomplainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    penghuni<T extends PenghuniDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PenghuniDefaultArgs<ExtArgs>>): Prisma__PenghuniClient<$Result.GetResult<Prisma.$PenghuniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    properti<T extends PropertiDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertiDefaultArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Komplain model
   */
  interface KomplainFieldRefs {
    readonly id: FieldRef<"Komplain", 'String'>
    readonly masalah: FieldRef<"Komplain", 'String'>
    readonly jenis: FieldRef<"Komplain", 'JenisKomplain'>
    readonly deskripsi: FieldRef<"Komplain", 'String'>
    readonly foto: FieldRef<"Komplain", 'String'>
    readonly status: FieldRef<"Komplain", 'StatusKomplain'>
    readonly created_at: FieldRef<"Komplain", 'DateTime'>
    readonly updated_at: FieldRef<"Komplain", 'DateTime'>
    readonly penghuni_id: FieldRef<"Komplain", 'String'>
    readonly properti_id: FieldRef<"Komplain", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Komplain findUnique
   */
  export type KomplainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    /**
     * Filter, which Komplain to fetch.
     */
    where: KomplainWhereUniqueInput
  }

  /**
   * Komplain findUniqueOrThrow
   */
  export type KomplainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    /**
     * Filter, which Komplain to fetch.
     */
    where: KomplainWhereUniqueInput
  }

  /**
   * Komplain findFirst
   */
  export type KomplainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    /**
     * Filter, which Komplain to fetch.
     */
    where?: KomplainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Komplains to fetch.
     */
    orderBy?: KomplainOrderByWithRelationInput | KomplainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Komplains.
     */
    cursor?: KomplainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Komplains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Komplains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Komplains.
     */
    distinct?: KomplainScalarFieldEnum | KomplainScalarFieldEnum[]
  }

  /**
   * Komplain findFirstOrThrow
   */
  export type KomplainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    /**
     * Filter, which Komplain to fetch.
     */
    where?: KomplainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Komplains to fetch.
     */
    orderBy?: KomplainOrderByWithRelationInput | KomplainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Komplains.
     */
    cursor?: KomplainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Komplains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Komplains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Komplains.
     */
    distinct?: KomplainScalarFieldEnum | KomplainScalarFieldEnum[]
  }

  /**
   * Komplain findMany
   */
  export type KomplainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    /**
     * Filter, which Komplains to fetch.
     */
    where?: KomplainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Komplains to fetch.
     */
    orderBy?: KomplainOrderByWithRelationInput | KomplainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Komplains.
     */
    cursor?: KomplainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Komplains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Komplains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Komplains.
     */
    distinct?: KomplainScalarFieldEnum | KomplainScalarFieldEnum[]
  }

  /**
   * Komplain create
   */
  export type KomplainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    /**
     * The data needed to create a Komplain.
     */
    data: XOR<KomplainCreateInput, KomplainUncheckedCreateInput>
  }

  /**
   * Komplain createMany
   */
  export type KomplainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Komplains.
     */
    data: KomplainCreateManyInput | KomplainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Komplain createManyAndReturn
   */
  export type KomplainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * The data used to create many Komplains.
     */
    data: KomplainCreateManyInput | KomplainCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Komplain update
   */
  export type KomplainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    /**
     * The data needed to update a Komplain.
     */
    data: XOR<KomplainUpdateInput, KomplainUncheckedUpdateInput>
    /**
     * Choose, which Komplain to update.
     */
    where: KomplainWhereUniqueInput
  }

  /**
   * Komplain updateMany
   */
  export type KomplainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Komplains.
     */
    data: XOR<KomplainUpdateManyMutationInput, KomplainUncheckedUpdateManyInput>
    /**
     * Filter which Komplains to update
     */
    where?: KomplainWhereInput
    /**
     * Limit how many Komplains to update.
     */
    limit?: number
  }

  /**
   * Komplain updateManyAndReturn
   */
  export type KomplainUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * The data used to update Komplains.
     */
    data: XOR<KomplainUpdateManyMutationInput, KomplainUncheckedUpdateManyInput>
    /**
     * Filter which Komplains to update
     */
    where?: KomplainWhereInput
    /**
     * Limit how many Komplains to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Komplain upsert
   */
  export type KomplainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    /**
     * The filter to search for the Komplain to update in case it exists.
     */
    where: KomplainWhereUniqueInput
    /**
     * In case the Komplain found by the `where` argument doesn't exist, create a new Komplain with this data.
     */
    create: XOR<KomplainCreateInput, KomplainUncheckedCreateInput>
    /**
     * In case the Komplain was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KomplainUpdateInput, KomplainUncheckedUpdateInput>
  }

  /**
   * Komplain delete
   */
  export type KomplainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
    /**
     * Filter which Komplain to delete.
     */
    where: KomplainWhereUniqueInput
  }

  /**
   * Komplain deleteMany
   */
  export type KomplainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Komplains to delete
     */
    where?: KomplainWhereInput
    /**
     * Limit how many Komplains to delete.
     */
    limit?: number
  }

  /**
   * Komplain without action
   */
  export type KomplainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komplain
     */
    select?: KomplainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komplain
     */
    omit?: KomplainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomplainInclude<ExtArgs> | null
  }


  /**
   * Model PengajuanDana
   */

  export type AggregatePengajuanDana = {
    _count: PengajuanDanaCountAggregateOutputType | null
    _avg: PengajuanDanaAvgAggregateOutputType | null
    _sum: PengajuanDanaSumAggregateOutputType | null
    _min: PengajuanDanaMinAggregateOutputType | null
    _max: PengajuanDanaMaxAggregateOutputType | null
  }

  export type PengajuanDanaAvgAggregateOutputType = {
    jumlah: number | null
  }

  export type PengajuanDanaSumAggregateOutputType = {
    jumlah: number | null
  }

  export type PengajuanDanaMinAggregateOutputType = {
    id: string | null
    tujuan: string | null
    jumlah: number | null
    no_rekening: string | null
    foto: string | null
    status: $Enums.StatusDana | null
    created_at: Date | null
    updated_at: Date | null
    operator_id: string | null
    properti_id: string | null
  }

  export type PengajuanDanaMaxAggregateOutputType = {
    id: string | null
    tujuan: string | null
    jumlah: number | null
    no_rekening: string | null
    foto: string | null
    status: $Enums.StatusDana | null
    created_at: Date | null
    updated_at: Date | null
    operator_id: string | null
    properti_id: string | null
  }

  export type PengajuanDanaCountAggregateOutputType = {
    id: number
    tujuan: number
    jumlah: number
    no_rekening: number
    foto: number
    status: number
    created_at: number
    updated_at: number
    operator_id: number
    properti_id: number
    _all: number
  }


  export type PengajuanDanaAvgAggregateInputType = {
    jumlah?: true
  }

  export type PengajuanDanaSumAggregateInputType = {
    jumlah?: true
  }

  export type PengajuanDanaMinAggregateInputType = {
    id?: true
    tujuan?: true
    jumlah?: true
    no_rekening?: true
    foto?: true
    status?: true
    created_at?: true
    updated_at?: true
    operator_id?: true
    properti_id?: true
  }

  export type PengajuanDanaMaxAggregateInputType = {
    id?: true
    tujuan?: true
    jumlah?: true
    no_rekening?: true
    foto?: true
    status?: true
    created_at?: true
    updated_at?: true
    operator_id?: true
    properti_id?: true
  }

  export type PengajuanDanaCountAggregateInputType = {
    id?: true
    tujuan?: true
    jumlah?: true
    no_rekening?: true
    foto?: true
    status?: true
    created_at?: true
    updated_at?: true
    operator_id?: true
    properti_id?: true
    _all?: true
  }

  export type PengajuanDanaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PengajuanDana to aggregate.
     */
    where?: PengajuanDanaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PengajuanDanas to fetch.
     */
    orderBy?: PengajuanDanaOrderByWithRelationInput | PengajuanDanaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PengajuanDanaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PengajuanDanas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PengajuanDanas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PengajuanDanas
    **/
    _count?: true | PengajuanDanaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PengajuanDanaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PengajuanDanaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PengajuanDanaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PengajuanDanaMaxAggregateInputType
  }

  export type GetPengajuanDanaAggregateType<T extends PengajuanDanaAggregateArgs> = {
        [P in keyof T & keyof AggregatePengajuanDana]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePengajuanDana[P]>
      : GetScalarType<T[P], AggregatePengajuanDana[P]>
  }




  export type PengajuanDanaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PengajuanDanaWhereInput
    orderBy?: PengajuanDanaOrderByWithAggregationInput | PengajuanDanaOrderByWithAggregationInput[]
    by: PengajuanDanaScalarFieldEnum[] | PengajuanDanaScalarFieldEnum
    having?: PengajuanDanaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PengajuanDanaCountAggregateInputType | true
    _avg?: PengajuanDanaAvgAggregateInputType
    _sum?: PengajuanDanaSumAggregateInputType
    _min?: PengajuanDanaMinAggregateInputType
    _max?: PengajuanDanaMaxAggregateInputType
  }

  export type PengajuanDanaGroupByOutputType = {
    id: string
    tujuan: string
    jumlah: number
    no_rekening: string
    foto: string | null
    status: $Enums.StatusDana
    created_at: Date
    updated_at: Date
    operator_id: string
    properti_id: string
    _count: PengajuanDanaCountAggregateOutputType | null
    _avg: PengajuanDanaAvgAggregateOutputType | null
    _sum: PengajuanDanaSumAggregateOutputType | null
    _min: PengajuanDanaMinAggregateOutputType | null
    _max: PengajuanDanaMaxAggregateOutputType | null
  }

  type GetPengajuanDanaGroupByPayload<T extends PengajuanDanaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PengajuanDanaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PengajuanDanaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PengajuanDanaGroupByOutputType[P]>
            : GetScalarType<T[P], PengajuanDanaGroupByOutputType[P]>
        }
      >
    >


  export type PengajuanDanaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tujuan?: boolean
    jumlah?: boolean
    no_rekening?: boolean
    foto?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    operator_id?: boolean
    properti_id?: boolean
    operator?: boolean | OperatorDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pengajuanDana"]>

  export type PengajuanDanaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tujuan?: boolean
    jumlah?: boolean
    no_rekening?: boolean
    foto?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    operator_id?: boolean
    properti_id?: boolean
    operator?: boolean | OperatorDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pengajuanDana"]>

  export type PengajuanDanaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tujuan?: boolean
    jumlah?: boolean
    no_rekening?: boolean
    foto?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    operator_id?: boolean
    properti_id?: boolean
    operator?: boolean | OperatorDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pengajuanDana"]>

  export type PengajuanDanaSelectScalar = {
    id?: boolean
    tujuan?: boolean
    jumlah?: boolean
    no_rekening?: boolean
    foto?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    operator_id?: boolean
    properti_id?: boolean
  }

  export type PengajuanDanaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tujuan" | "jumlah" | "no_rekening" | "foto" | "status" | "created_at" | "updated_at" | "operator_id" | "properti_id", ExtArgs["result"]["pengajuanDana"]>
  export type PengajuanDanaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    operator?: boolean | OperatorDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }
  export type PengajuanDanaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    operator?: boolean | OperatorDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }
  export type PengajuanDanaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    operator?: boolean | OperatorDefaultArgs<ExtArgs>
    properti?: boolean | PropertiDefaultArgs<ExtArgs>
  }

  export type $PengajuanDanaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PengajuanDana"
    objects: {
      operator: Prisma.$OperatorPayload<ExtArgs>
      properti: Prisma.$PropertiPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tujuan: string
      jumlah: number
      no_rekening: string
      foto: string | null
      status: $Enums.StatusDana
      created_at: Date
      updated_at: Date
      operator_id: string
      properti_id: string
    }, ExtArgs["result"]["pengajuanDana"]>
    composites: {}
  }

  type PengajuanDanaGetPayload<S extends boolean | null | undefined | PengajuanDanaDefaultArgs> = $Result.GetResult<Prisma.$PengajuanDanaPayload, S>

  type PengajuanDanaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PengajuanDanaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PengajuanDanaCountAggregateInputType | true
    }

  export interface PengajuanDanaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PengajuanDana'], meta: { name: 'PengajuanDana' } }
    /**
     * Find zero or one PengajuanDana that matches the filter.
     * @param {PengajuanDanaFindUniqueArgs} args - Arguments to find a PengajuanDana
     * @example
     * // Get one PengajuanDana
     * const pengajuanDana = await prisma.pengajuanDana.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PengajuanDanaFindUniqueArgs>(args: SelectSubset<T, PengajuanDanaFindUniqueArgs<ExtArgs>>): Prisma__PengajuanDanaClient<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PengajuanDana that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PengajuanDanaFindUniqueOrThrowArgs} args - Arguments to find a PengajuanDana
     * @example
     * // Get one PengajuanDana
     * const pengajuanDana = await prisma.pengajuanDana.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PengajuanDanaFindUniqueOrThrowArgs>(args: SelectSubset<T, PengajuanDanaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PengajuanDanaClient<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PengajuanDana that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanDanaFindFirstArgs} args - Arguments to find a PengajuanDana
     * @example
     * // Get one PengajuanDana
     * const pengajuanDana = await prisma.pengajuanDana.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PengajuanDanaFindFirstArgs>(args?: SelectSubset<T, PengajuanDanaFindFirstArgs<ExtArgs>>): Prisma__PengajuanDanaClient<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PengajuanDana that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanDanaFindFirstOrThrowArgs} args - Arguments to find a PengajuanDana
     * @example
     * // Get one PengajuanDana
     * const pengajuanDana = await prisma.pengajuanDana.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PengajuanDanaFindFirstOrThrowArgs>(args?: SelectSubset<T, PengajuanDanaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PengajuanDanaClient<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PengajuanDanas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanDanaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PengajuanDanas
     * const pengajuanDanas = await prisma.pengajuanDana.findMany()
     * 
     * // Get first 10 PengajuanDanas
     * const pengajuanDanas = await prisma.pengajuanDana.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pengajuanDanaWithIdOnly = await prisma.pengajuanDana.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PengajuanDanaFindManyArgs>(args?: SelectSubset<T, PengajuanDanaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PengajuanDana.
     * @param {PengajuanDanaCreateArgs} args - Arguments to create a PengajuanDana.
     * @example
     * // Create one PengajuanDana
     * const PengajuanDana = await prisma.pengajuanDana.create({
     *   data: {
     *     // ... data to create a PengajuanDana
     *   }
     * })
     * 
     */
    create<T extends PengajuanDanaCreateArgs>(args: SelectSubset<T, PengajuanDanaCreateArgs<ExtArgs>>): Prisma__PengajuanDanaClient<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PengajuanDanas.
     * @param {PengajuanDanaCreateManyArgs} args - Arguments to create many PengajuanDanas.
     * @example
     * // Create many PengajuanDanas
     * const pengajuanDana = await prisma.pengajuanDana.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PengajuanDanaCreateManyArgs>(args?: SelectSubset<T, PengajuanDanaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PengajuanDanas and returns the data saved in the database.
     * @param {PengajuanDanaCreateManyAndReturnArgs} args - Arguments to create many PengajuanDanas.
     * @example
     * // Create many PengajuanDanas
     * const pengajuanDana = await prisma.pengajuanDana.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PengajuanDanas and only return the `id`
     * const pengajuanDanaWithIdOnly = await prisma.pengajuanDana.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PengajuanDanaCreateManyAndReturnArgs>(args?: SelectSubset<T, PengajuanDanaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PengajuanDana.
     * @param {PengajuanDanaDeleteArgs} args - Arguments to delete one PengajuanDana.
     * @example
     * // Delete one PengajuanDana
     * const PengajuanDana = await prisma.pengajuanDana.delete({
     *   where: {
     *     // ... filter to delete one PengajuanDana
     *   }
     * })
     * 
     */
    delete<T extends PengajuanDanaDeleteArgs>(args: SelectSubset<T, PengajuanDanaDeleteArgs<ExtArgs>>): Prisma__PengajuanDanaClient<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PengajuanDana.
     * @param {PengajuanDanaUpdateArgs} args - Arguments to update one PengajuanDana.
     * @example
     * // Update one PengajuanDana
     * const pengajuanDana = await prisma.pengajuanDana.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PengajuanDanaUpdateArgs>(args: SelectSubset<T, PengajuanDanaUpdateArgs<ExtArgs>>): Prisma__PengajuanDanaClient<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PengajuanDanas.
     * @param {PengajuanDanaDeleteManyArgs} args - Arguments to filter PengajuanDanas to delete.
     * @example
     * // Delete a few PengajuanDanas
     * const { count } = await prisma.pengajuanDana.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PengajuanDanaDeleteManyArgs>(args?: SelectSubset<T, PengajuanDanaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PengajuanDanas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanDanaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PengajuanDanas
     * const pengajuanDana = await prisma.pengajuanDana.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PengajuanDanaUpdateManyArgs>(args: SelectSubset<T, PengajuanDanaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PengajuanDanas and returns the data updated in the database.
     * @param {PengajuanDanaUpdateManyAndReturnArgs} args - Arguments to update many PengajuanDanas.
     * @example
     * // Update many PengajuanDanas
     * const pengajuanDana = await prisma.pengajuanDana.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PengajuanDanas and only return the `id`
     * const pengajuanDanaWithIdOnly = await prisma.pengajuanDana.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PengajuanDanaUpdateManyAndReturnArgs>(args: SelectSubset<T, PengajuanDanaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PengajuanDana.
     * @param {PengajuanDanaUpsertArgs} args - Arguments to update or create a PengajuanDana.
     * @example
     * // Update or create a PengajuanDana
     * const pengajuanDana = await prisma.pengajuanDana.upsert({
     *   create: {
     *     // ... data to create a PengajuanDana
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PengajuanDana we want to update
     *   }
     * })
     */
    upsert<T extends PengajuanDanaUpsertArgs>(args: SelectSubset<T, PengajuanDanaUpsertArgs<ExtArgs>>): Prisma__PengajuanDanaClient<$Result.GetResult<Prisma.$PengajuanDanaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PengajuanDanas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanDanaCountArgs} args - Arguments to filter PengajuanDanas to count.
     * @example
     * // Count the number of PengajuanDanas
     * const count = await prisma.pengajuanDana.count({
     *   where: {
     *     // ... the filter for the PengajuanDanas we want to count
     *   }
     * })
    **/
    count<T extends PengajuanDanaCountArgs>(
      args?: Subset<T, PengajuanDanaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PengajuanDanaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PengajuanDana.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanDanaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PengajuanDanaAggregateArgs>(args: Subset<T, PengajuanDanaAggregateArgs>): Prisma.PrismaPromise<GetPengajuanDanaAggregateType<T>>

    /**
     * Group by PengajuanDana.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanDanaGroupByArgs} args - Group by arguments.
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
      T extends PengajuanDanaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PengajuanDanaGroupByArgs['orderBy'] }
        : { orderBy?: PengajuanDanaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PengajuanDanaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPengajuanDanaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PengajuanDana model
   */
  readonly fields: PengajuanDanaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PengajuanDana.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PengajuanDanaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    operator<T extends OperatorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OperatorDefaultArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    properti<T extends PropertiDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertiDefaultArgs<ExtArgs>>): Prisma__PropertiClient<$Result.GetResult<Prisma.$PropertiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PengajuanDana model
   */
  interface PengajuanDanaFieldRefs {
    readonly id: FieldRef<"PengajuanDana", 'String'>
    readonly tujuan: FieldRef<"PengajuanDana", 'String'>
    readonly jumlah: FieldRef<"PengajuanDana", 'Int'>
    readonly no_rekening: FieldRef<"PengajuanDana", 'String'>
    readonly foto: FieldRef<"PengajuanDana", 'String'>
    readonly status: FieldRef<"PengajuanDana", 'StatusDana'>
    readonly created_at: FieldRef<"PengajuanDana", 'DateTime'>
    readonly updated_at: FieldRef<"PengajuanDana", 'DateTime'>
    readonly operator_id: FieldRef<"PengajuanDana", 'String'>
    readonly properti_id: FieldRef<"PengajuanDana", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PengajuanDana findUnique
   */
  export type PengajuanDanaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    /**
     * Filter, which PengajuanDana to fetch.
     */
    where: PengajuanDanaWhereUniqueInput
  }

  /**
   * PengajuanDana findUniqueOrThrow
   */
  export type PengajuanDanaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    /**
     * Filter, which PengajuanDana to fetch.
     */
    where: PengajuanDanaWhereUniqueInput
  }

  /**
   * PengajuanDana findFirst
   */
  export type PengajuanDanaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    /**
     * Filter, which PengajuanDana to fetch.
     */
    where?: PengajuanDanaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PengajuanDanas to fetch.
     */
    orderBy?: PengajuanDanaOrderByWithRelationInput | PengajuanDanaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PengajuanDanas.
     */
    cursor?: PengajuanDanaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PengajuanDanas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PengajuanDanas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PengajuanDanas.
     */
    distinct?: PengajuanDanaScalarFieldEnum | PengajuanDanaScalarFieldEnum[]
  }

  /**
   * PengajuanDana findFirstOrThrow
   */
  export type PengajuanDanaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    /**
     * Filter, which PengajuanDana to fetch.
     */
    where?: PengajuanDanaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PengajuanDanas to fetch.
     */
    orderBy?: PengajuanDanaOrderByWithRelationInput | PengajuanDanaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PengajuanDanas.
     */
    cursor?: PengajuanDanaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PengajuanDanas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PengajuanDanas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PengajuanDanas.
     */
    distinct?: PengajuanDanaScalarFieldEnum | PengajuanDanaScalarFieldEnum[]
  }

  /**
   * PengajuanDana findMany
   */
  export type PengajuanDanaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    /**
     * Filter, which PengajuanDanas to fetch.
     */
    where?: PengajuanDanaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PengajuanDanas to fetch.
     */
    orderBy?: PengajuanDanaOrderByWithRelationInput | PengajuanDanaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PengajuanDanas.
     */
    cursor?: PengajuanDanaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PengajuanDanas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PengajuanDanas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PengajuanDanas.
     */
    distinct?: PengajuanDanaScalarFieldEnum | PengajuanDanaScalarFieldEnum[]
  }

  /**
   * PengajuanDana create
   */
  export type PengajuanDanaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    /**
     * The data needed to create a PengajuanDana.
     */
    data: XOR<PengajuanDanaCreateInput, PengajuanDanaUncheckedCreateInput>
  }

  /**
   * PengajuanDana createMany
   */
  export type PengajuanDanaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PengajuanDanas.
     */
    data: PengajuanDanaCreateManyInput | PengajuanDanaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PengajuanDana createManyAndReturn
   */
  export type PengajuanDanaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * The data used to create many PengajuanDanas.
     */
    data: PengajuanDanaCreateManyInput | PengajuanDanaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PengajuanDana update
   */
  export type PengajuanDanaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    /**
     * The data needed to update a PengajuanDana.
     */
    data: XOR<PengajuanDanaUpdateInput, PengajuanDanaUncheckedUpdateInput>
    /**
     * Choose, which PengajuanDana to update.
     */
    where: PengajuanDanaWhereUniqueInput
  }

  /**
   * PengajuanDana updateMany
   */
  export type PengajuanDanaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PengajuanDanas.
     */
    data: XOR<PengajuanDanaUpdateManyMutationInput, PengajuanDanaUncheckedUpdateManyInput>
    /**
     * Filter which PengajuanDanas to update
     */
    where?: PengajuanDanaWhereInput
    /**
     * Limit how many PengajuanDanas to update.
     */
    limit?: number
  }

  /**
   * PengajuanDana updateManyAndReturn
   */
  export type PengajuanDanaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * The data used to update PengajuanDanas.
     */
    data: XOR<PengajuanDanaUpdateManyMutationInput, PengajuanDanaUncheckedUpdateManyInput>
    /**
     * Filter which PengajuanDanas to update
     */
    where?: PengajuanDanaWhereInput
    /**
     * Limit how many PengajuanDanas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PengajuanDana upsert
   */
  export type PengajuanDanaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    /**
     * The filter to search for the PengajuanDana to update in case it exists.
     */
    where: PengajuanDanaWhereUniqueInput
    /**
     * In case the PengajuanDana found by the `where` argument doesn't exist, create a new PengajuanDana with this data.
     */
    create: XOR<PengajuanDanaCreateInput, PengajuanDanaUncheckedCreateInput>
    /**
     * In case the PengajuanDana was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PengajuanDanaUpdateInput, PengajuanDanaUncheckedUpdateInput>
  }

  /**
   * PengajuanDana delete
   */
  export type PengajuanDanaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
    /**
     * Filter which PengajuanDana to delete.
     */
    where: PengajuanDanaWhereUniqueInput
  }

  /**
   * PengajuanDana deleteMany
   */
  export type PengajuanDanaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PengajuanDanas to delete
     */
    where?: PengajuanDanaWhereInput
    /**
     * Limit how many PengajuanDanas to delete.
     */
    limit?: number
  }

  /**
   * PengajuanDana without action
   */
  export type PengajuanDanaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanDana
     */
    select?: PengajuanDanaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanDana
     */
    omit?: PengajuanDanaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengajuanDanaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    nama: 'nama',
    role: 'role',
    no_telepon: 'no_telepon',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AdminSettingsScalarFieldEnum: {
    id: 'id',
    nama_rekening: 'nama_rekening',
    nomor_rekening: 'nomor_rekening',
    bank: 'bank',
    qris_image: 'qris_image',
    updated_at: 'updated_at',
    user_id: 'user_id'
  };

  export type AdminSettingsScalarFieldEnum = (typeof AdminSettingsScalarFieldEnum)[keyof typeof AdminSettingsScalarFieldEnum]


  export const PropertiScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    alamat: 'alamat',
    jenis: 'jenis',
    deskripsi: 'deskripsi',
    kebijakan: 'kebijakan',
    gambar: 'gambar',
    created_at: 'created_at',
    updated_at: 'updated_at',
    admin_id: 'admin_id'
  };

  export type PropertiScalarFieldEnum = (typeof PropertiScalarFieldEnum)[keyof typeof PropertiScalarFieldEnum]


  export const KamarScalarFieldEnum: {
    id: 'id',
    nomor: 'nomor',
    tipe: 'tipe',
    luas: 'luas',
    fasilitas: 'fasilitas',
    deskripsi: 'deskripsi',
    tarif: 'tarif',
    gambar: 'gambar',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    properti_id: 'properti_id'
  };

  export type KamarScalarFieldEnum = (typeof KamarScalarFieldEnum)[keyof typeof KamarScalarFieldEnum]


  export const PemesananScalarFieldEnum: {
    id: 'id',
    durasi_sewa: 'durasi_sewa',
    tgl_masuk: 'tgl_masuk',
    metode_bayar: 'metode_bayar',
    total_bayar: 'total_bayar',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    kamar_id: 'kamar_id',
    penghuni_id: 'penghuni_id',
    properti_id: 'properti_id'
  };

  export type PemesananScalarFieldEnum = (typeof PemesananScalarFieldEnum)[keyof typeof PemesananScalarFieldEnum]


  export const PembayaranScalarFieldEnum: {
    id: 'id',
    metode_bayar: 'metode_bayar',
    bukti: 'bukti',
    status: 'status',
    tgl_bayar: 'tgl_bayar',
    created_at: 'created_at',
    updated_at: 'updated_at',
    pemesanan_id: 'pemesanan_id'
  };

  export type PembayaranScalarFieldEnum = (typeof PembayaranScalarFieldEnum)[keyof typeof PembayaranScalarFieldEnum]


  export const PenghuniScalarFieldEnum: {
    id: 'id',
    tgl_mulai: 'tgl_mulai',
    tgl_berakhir: 'tgl_berakhir',
    status_sewa: 'status_sewa',
    created_at: 'created_at',
    updated_at: 'updated_at',
    user_id: 'user_id',
    kamar_id: 'kamar_id'
  };

  export type PenghuniScalarFieldEnum = (typeof PenghuniScalarFieldEnum)[keyof typeof PenghuniScalarFieldEnum]


  export const OperatorScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    user_id: 'user_id',
    properti_id: 'properti_id'
  };

  export type OperatorScalarFieldEnum = (typeof OperatorScalarFieldEnum)[keyof typeof OperatorScalarFieldEnum]


  export const KomplainScalarFieldEnum: {
    id: 'id',
    masalah: 'masalah',
    jenis: 'jenis',
    deskripsi: 'deskripsi',
    foto: 'foto',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    penghuni_id: 'penghuni_id',
    properti_id: 'properti_id'
  };

  export type KomplainScalarFieldEnum = (typeof KomplainScalarFieldEnum)[keyof typeof KomplainScalarFieldEnum]


  export const PengajuanDanaScalarFieldEnum: {
    id: 'id',
    tujuan: 'tujuan',
    jumlah: 'jumlah',
    no_rekening: 'no_rekening',
    foto: 'foto',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    operator_id: 'operator_id',
    properti_id: 'properti_id'
  };

  export type PengajuanDanaScalarFieldEnum = (typeof PengajuanDanaScalarFieldEnum)[keyof typeof PengajuanDanaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'JenisProperti'
   */
  export type EnumJenisPropertiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JenisProperti'>
    


  /**
   * Reference to a field of type 'JenisProperti[]'
   */
  export type ListEnumJenisPropertiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JenisProperti[]'>
    


  /**
   * Reference to a field of type 'TipeKamar'
   */
  export type EnumTipeKamarFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipeKamar'>
    


  /**
   * Reference to a field of type 'TipeKamar[]'
   */
  export type ListEnumTipeKamarFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipeKamar[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'StatusKamar'
   */
  export type EnumStatusKamarFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKamar'>
    


  /**
   * Reference to a field of type 'StatusKamar[]'
   */
  export type ListEnumStatusKamarFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKamar[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'StatusPemesanan'
   */
  export type EnumStatusPemesananFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusPemesanan'>
    


  /**
   * Reference to a field of type 'StatusPemesanan[]'
   */
  export type ListEnumStatusPemesananFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusPemesanan[]'>
    


  /**
   * Reference to a field of type 'StatusPembayaran'
   */
  export type EnumStatusPembayaranFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusPembayaran'>
    


  /**
   * Reference to a field of type 'StatusPembayaran[]'
   */
  export type ListEnumStatusPembayaranFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusPembayaran[]'>
    


  /**
   * Reference to a field of type 'StatusSewa'
   */
  export type EnumStatusSewaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusSewa'>
    


  /**
   * Reference to a field of type 'StatusSewa[]'
   */
  export type ListEnumStatusSewaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusSewa[]'>
    


  /**
   * Reference to a field of type 'JenisKomplain'
   */
  export type EnumJenisKomplainFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JenisKomplain'>
    


  /**
   * Reference to a field of type 'JenisKomplain[]'
   */
  export type ListEnumJenisKomplainFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JenisKomplain[]'>
    


  /**
   * Reference to a field of type 'StatusKomplain'
   */
  export type EnumStatusKomplainFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKomplain'>
    


  /**
   * Reference to a field of type 'StatusKomplain[]'
   */
  export type ListEnumStatusKomplainFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKomplain[]'>
    


  /**
   * Reference to a field of type 'StatusDana'
   */
  export type EnumStatusDanaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusDana'>
    


  /**
   * Reference to a field of type 'StatusDana[]'
   */
  export type ListEnumStatusDanaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusDana[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    nama?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    no_telepon?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    penghuni?: XOR<PenghuniNullableScalarRelationFilter, PenghuniWhereInput> | null
    operator?: XOR<OperatorNullableScalarRelationFilter, OperatorWhereInput> | null
    properti?: PropertiListRelationFilter
    settings?: XOR<AdminSettingsNullableScalarRelationFilter, AdminSettingsWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    no_telepon?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    penghuni?: PenghuniOrderByWithRelationInput
    operator?: OperatorOrderByWithRelationInput
    properti?: PropertiOrderByRelationAggregateInput
    settings?: AdminSettingsOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    no_telepon?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    nama?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    penghuni?: XOR<PenghuniNullableScalarRelationFilter, PenghuniWhereInput> | null
    operator?: XOR<OperatorNullableScalarRelationFilter, OperatorWhereInput> | null
    properti?: PropertiListRelationFilter
    settings?: XOR<AdminSettingsNullableScalarRelationFilter, AdminSettingsWhereInput> | null
  }, "id" | "username" | "email" | "no_telepon">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    no_telepon?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    nama?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    no_telepon?: StringNullableWithAggregatesFilter<"User"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AdminSettingsWhereInput = {
    AND?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    OR?: AdminSettingsWhereInput[]
    NOT?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    id?: StringFilter<"AdminSettings"> | string
    nama_rekening?: StringNullableFilter<"AdminSettings"> | string | null
    nomor_rekening?: StringNullableFilter<"AdminSettings"> | string | null
    bank?: StringNullableFilter<"AdminSettings"> | string | null
    qris_image?: StringNullableFilter<"AdminSettings"> | string | null
    updated_at?: DateTimeFilter<"AdminSettings"> | Date | string
    user_id?: StringFilter<"AdminSettings"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AdminSettingsOrderByWithRelationInput = {
    id?: SortOrder
    nama_rekening?: SortOrderInput | SortOrder
    nomor_rekening?: SortOrderInput | SortOrder
    bank?: SortOrderInput | SortOrder
    qris_image?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AdminSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    AND?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    OR?: AdminSettingsWhereInput[]
    NOT?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    nama_rekening?: StringNullableFilter<"AdminSettings"> | string | null
    nomor_rekening?: StringNullableFilter<"AdminSettings"> | string | null
    bank?: StringNullableFilter<"AdminSettings"> | string | null
    qris_image?: StringNullableFilter<"AdminSettings"> | string | null
    updated_at?: DateTimeFilter<"AdminSettings"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "user_id">

  export type AdminSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    nama_rekening?: SortOrderInput | SortOrder
    nomor_rekening?: SortOrderInput | SortOrder
    bank?: SortOrderInput | SortOrder
    qris_image?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    _count?: AdminSettingsCountOrderByAggregateInput
    _max?: AdminSettingsMaxOrderByAggregateInput
    _min?: AdminSettingsMinOrderByAggregateInput
  }

  export type AdminSettingsScalarWhereWithAggregatesInput = {
    AND?: AdminSettingsScalarWhereWithAggregatesInput | AdminSettingsScalarWhereWithAggregatesInput[]
    OR?: AdminSettingsScalarWhereWithAggregatesInput[]
    NOT?: AdminSettingsScalarWhereWithAggregatesInput | AdminSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminSettings"> | string
    nama_rekening?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    nomor_rekening?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    bank?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    qris_image?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    updated_at?: DateTimeWithAggregatesFilter<"AdminSettings"> | Date | string
    user_id?: StringWithAggregatesFilter<"AdminSettings"> | string
  }

  export type PropertiWhereInput = {
    AND?: PropertiWhereInput | PropertiWhereInput[]
    OR?: PropertiWhereInput[]
    NOT?: PropertiWhereInput | PropertiWhereInput[]
    id?: StringFilter<"Properti"> | string
    nama?: StringFilter<"Properti"> | string
    alamat?: StringFilter<"Properti"> | string
    jenis?: EnumJenisPropertiNullableFilter<"Properti"> | $Enums.JenisProperti | null
    deskripsi?: StringNullableFilter<"Properti"> | string | null
    kebijakan?: StringNullableFilter<"Properti"> | string | null
    gambar?: StringNullableListFilter<"Properti">
    created_at?: DateTimeFilter<"Properti"> | Date | string
    updated_at?: DateTimeFilter<"Properti"> | Date | string
    admin_id?: StringFilter<"Properti"> | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
    kamar?: KamarListRelationFilter
    komplain?: KomplainListRelationFilter
    operator?: OperatorListRelationFilter
    pemesanan?: PemesananListRelationFilter
    pengajuanDana?: PengajuanDanaListRelationFilter
  }

  export type PropertiOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    alamat?: SortOrder
    jenis?: SortOrderInput | SortOrder
    deskripsi?: SortOrderInput | SortOrder
    kebijakan?: SortOrderInput | SortOrder
    gambar?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    admin_id?: SortOrder
    admin?: UserOrderByWithRelationInput
    kamar?: KamarOrderByRelationAggregateInput
    komplain?: KomplainOrderByRelationAggregateInput
    operator?: OperatorOrderByRelationAggregateInput
    pemesanan?: PemesananOrderByRelationAggregateInput
    pengajuanDana?: PengajuanDanaOrderByRelationAggregateInput
  }

  export type PropertiWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PropertiWhereInput | PropertiWhereInput[]
    OR?: PropertiWhereInput[]
    NOT?: PropertiWhereInput | PropertiWhereInput[]
    nama?: StringFilter<"Properti"> | string
    alamat?: StringFilter<"Properti"> | string
    jenis?: EnumJenisPropertiNullableFilter<"Properti"> | $Enums.JenisProperti | null
    deskripsi?: StringNullableFilter<"Properti"> | string | null
    kebijakan?: StringNullableFilter<"Properti"> | string | null
    gambar?: StringNullableListFilter<"Properti">
    created_at?: DateTimeFilter<"Properti"> | Date | string
    updated_at?: DateTimeFilter<"Properti"> | Date | string
    admin_id?: StringFilter<"Properti"> | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
    kamar?: KamarListRelationFilter
    komplain?: KomplainListRelationFilter
    operator?: OperatorListRelationFilter
    pemesanan?: PemesananListRelationFilter
    pengajuanDana?: PengajuanDanaListRelationFilter
  }, "id">

  export type PropertiOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    alamat?: SortOrder
    jenis?: SortOrderInput | SortOrder
    deskripsi?: SortOrderInput | SortOrder
    kebijakan?: SortOrderInput | SortOrder
    gambar?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    admin_id?: SortOrder
    _count?: PropertiCountOrderByAggregateInput
    _max?: PropertiMaxOrderByAggregateInput
    _min?: PropertiMinOrderByAggregateInput
  }

  export type PropertiScalarWhereWithAggregatesInput = {
    AND?: PropertiScalarWhereWithAggregatesInput | PropertiScalarWhereWithAggregatesInput[]
    OR?: PropertiScalarWhereWithAggregatesInput[]
    NOT?: PropertiScalarWhereWithAggregatesInput | PropertiScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Properti"> | string
    nama?: StringWithAggregatesFilter<"Properti"> | string
    alamat?: StringWithAggregatesFilter<"Properti"> | string
    jenis?: EnumJenisPropertiNullableWithAggregatesFilter<"Properti"> | $Enums.JenisProperti | null
    deskripsi?: StringNullableWithAggregatesFilter<"Properti"> | string | null
    kebijakan?: StringNullableWithAggregatesFilter<"Properti"> | string | null
    gambar?: StringNullableListFilter<"Properti">
    created_at?: DateTimeWithAggregatesFilter<"Properti"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Properti"> | Date | string
    admin_id?: StringWithAggregatesFilter<"Properti"> | string
  }

  export type KamarWhereInput = {
    AND?: KamarWhereInput | KamarWhereInput[]
    OR?: KamarWhereInput[]
    NOT?: KamarWhereInput | KamarWhereInput[]
    id?: StringFilter<"Kamar"> | string
    nomor?: StringFilter<"Kamar"> | string
    tipe?: EnumTipeKamarFilter<"Kamar"> | $Enums.TipeKamar
    luas?: StringNullableFilter<"Kamar"> | string | null
    fasilitas?: StringNullableListFilter<"Kamar">
    deskripsi?: StringNullableFilter<"Kamar"> | string | null
    tarif?: JsonNullableFilter<"Kamar">
    gambar?: StringNullableListFilter<"Kamar">
    status?: EnumStatusKamarFilter<"Kamar"> | $Enums.StatusKamar
    created_at?: DateTimeFilter<"Kamar"> | Date | string
    updated_at?: DateTimeFilter<"Kamar"> | Date | string
    properti_id?: StringFilter<"Kamar"> | string
    properti?: XOR<PropertiScalarRelationFilter, PropertiWhereInput>
    pemesanan?: PemesananListRelationFilter
    penghuni?: XOR<PenghuniNullableScalarRelationFilter, PenghuniWhereInput> | null
  }

  export type KamarOrderByWithRelationInput = {
    id?: SortOrder
    nomor?: SortOrder
    tipe?: SortOrder
    luas?: SortOrderInput | SortOrder
    fasilitas?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    tarif?: SortOrderInput | SortOrder
    gambar?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    properti_id?: SortOrder
    properti?: PropertiOrderByWithRelationInput
    pemesanan?: PemesananOrderByRelationAggregateInput
    penghuni?: PenghuniOrderByWithRelationInput
  }

  export type KamarWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    properti_id_nomor?: KamarProperti_idNomorCompoundUniqueInput
    AND?: KamarWhereInput | KamarWhereInput[]
    OR?: KamarWhereInput[]
    NOT?: KamarWhereInput | KamarWhereInput[]
    nomor?: StringFilter<"Kamar"> | string
    tipe?: EnumTipeKamarFilter<"Kamar"> | $Enums.TipeKamar
    luas?: StringNullableFilter<"Kamar"> | string | null
    fasilitas?: StringNullableListFilter<"Kamar">
    deskripsi?: StringNullableFilter<"Kamar"> | string | null
    tarif?: JsonNullableFilter<"Kamar">
    gambar?: StringNullableListFilter<"Kamar">
    status?: EnumStatusKamarFilter<"Kamar"> | $Enums.StatusKamar
    created_at?: DateTimeFilter<"Kamar"> | Date | string
    updated_at?: DateTimeFilter<"Kamar"> | Date | string
    properti_id?: StringFilter<"Kamar"> | string
    properti?: XOR<PropertiScalarRelationFilter, PropertiWhereInput>
    pemesanan?: PemesananListRelationFilter
    penghuni?: XOR<PenghuniNullableScalarRelationFilter, PenghuniWhereInput> | null
  }, "id" | "properti_id_nomor">

  export type KamarOrderByWithAggregationInput = {
    id?: SortOrder
    nomor?: SortOrder
    tipe?: SortOrder
    luas?: SortOrderInput | SortOrder
    fasilitas?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    tarif?: SortOrderInput | SortOrder
    gambar?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    properti_id?: SortOrder
    _count?: KamarCountOrderByAggregateInput
    _max?: KamarMaxOrderByAggregateInput
    _min?: KamarMinOrderByAggregateInput
  }

  export type KamarScalarWhereWithAggregatesInput = {
    AND?: KamarScalarWhereWithAggregatesInput | KamarScalarWhereWithAggregatesInput[]
    OR?: KamarScalarWhereWithAggregatesInput[]
    NOT?: KamarScalarWhereWithAggregatesInput | KamarScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Kamar"> | string
    nomor?: StringWithAggregatesFilter<"Kamar"> | string
    tipe?: EnumTipeKamarWithAggregatesFilter<"Kamar"> | $Enums.TipeKamar
    luas?: StringNullableWithAggregatesFilter<"Kamar"> | string | null
    fasilitas?: StringNullableListFilter<"Kamar">
    deskripsi?: StringNullableWithAggregatesFilter<"Kamar"> | string | null
    tarif?: JsonNullableWithAggregatesFilter<"Kamar">
    gambar?: StringNullableListFilter<"Kamar">
    status?: EnumStatusKamarWithAggregatesFilter<"Kamar"> | $Enums.StatusKamar
    created_at?: DateTimeWithAggregatesFilter<"Kamar"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Kamar"> | Date | string
    properti_id?: StringWithAggregatesFilter<"Kamar"> | string
  }

  export type PemesananWhereInput = {
    AND?: PemesananWhereInput | PemesananWhereInput[]
    OR?: PemesananWhereInput[]
    NOT?: PemesananWhereInput | PemesananWhereInput[]
    id?: StringFilter<"Pemesanan"> | string
    durasi_sewa?: IntFilter<"Pemesanan"> | number
    tgl_masuk?: DateTimeFilter<"Pemesanan"> | Date | string
    metode_bayar?: StringFilter<"Pemesanan"> | string
    total_bayar?: IntFilter<"Pemesanan"> | number
    status?: EnumStatusPemesananFilter<"Pemesanan"> | $Enums.StatusPemesanan
    created_at?: DateTimeFilter<"Pemesanan"> | Date | string
    updated_at?: DateTimeFilter<"Pemesanan"> | Date | string
    kamar_id?: StringFilter<"Pemesanan"> | string
    penghuni_id?: StringFilter<"Pemesanan"> | string
    properti_id?: StringFilter<"Pemesanan"> | string
    kamar?: XOR<KamarScalarRelationFilter, KamarWhereInput>
    penghuni?: XOR<PenghuniScalarRelationFilter, PenghuniWhereInput>
    properti?: XOR<PropertiScalarRelationFilter, PropertiWhereInput>
    pembayaran?: XOR<PembayaranNullableScalarRelationFilter, PembayaranWhereInput> | null
  }

  export type PemesananOrderByWithRelationInput = {
    id?: SortOrder
    durasi_sewa?: SortOrder
    tgl_masuk?: SortOrder
    metode_bayar?: SortOrder
    total_bayar?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    kamar_id?: SortOrder
    penghuni_id?: SortOrder
    properti_id?: SortOrder
    kamar?: KamarOrderByWithRelationInput
    penghuni?: PenghuniOrderByWithRelationInput
    properti?: PropertiOrderByWithRelationInput
    pembayaran?: PembayaranOrderByWithRelationInput
  }

  export type PemesananWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PemesananWhereInput | PemesananWhereInput[]
    OR?: PemesananWhereInput[]
    NOT?: PemesananWhereInput | PemesananWhereInput[]
    durasi_sewa?: IntFilter<"Pemesanan"> | number
    tgl_masuk?: DateTimeFilter<"Pemesanan"> | Date | string
    metode_bayar?: StringFilter<"Pemesanan"> | string
    total_bayar?: IntFilter<"Pemesanan"> | number
    status?: EnumStatusPemesananFilter<"Pemesanan"> | $Enums.StatusPemesanan
    created_at?: DateTimeFilter<"Pemesanan"> | Date | string
    updated_at?: DateTimeFilter<"Pemesanan"> | Date | string
    kamar_id?: StringFilter<"Pemesanan"> | string
    penghuni_id?: StringFilter<"Pemesanan"> | string
    properti_id?: StringFilter<"Pemesanan"> | string
    kamar?: XOR<KamarScalarRelationFilter, KamarWhereInput>
    penghuni?: XOR<PenghuniScalarRelationFilter, PenghuniWhereInput>
    properti?: XOR<PropertiScalarRelationFilter, PropertiWhereInput>
    pembayaran?: XOR<PembayaranNullableScalarRelationFilter, PembayaranWhereInput> | null
  }, "id">

  export type PemesananOrderByWithAggregationInput = {
    id?: SortOrder
    durasi_sewa?: SortOrder
    tgl_masuk?: SortOrder
    metode_bayar?: SortOrder
    total_bayar?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    kamar_id?: SortOrder
    penghuni_id?: SortOrder
    properti_id?: SortOrder
    _count?: PemesananCountOrderByAggregateInput
    _avg?: PemesananAvgOrderByAggregateInput
    _max?: PemesananMaxOrderByAggregateInput
    _min?: PemesananMinOrderByAggregateInput
    _sum?: PemesananSumOrderByAggregateInput
  }

  export type PemesananScalarWhereWithAggregatesInput = {
    AND?: PemesananScalarWhereWithAggregatesInput | PemesananScalarWhereWithAggregatesInput[]
    OR?: PemesananScalarWhereWithAggregatesInput[]
    NOT?: PemesananScalarWhereWithAggregatesInput | PemesananScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pemesanan"> | string
    durasi_sewa?: IntWithAggregatesFilter<"Pemesanan"> | number
    tgl_masuk?: DateTimeWithAggregatesFilter<"Pemesanan"> | Date | string
    metode_bayar?: StringWithAggregatesFilter<"Pemesanan"> | string
    total_bayar?: IntWithAggregatesFilter<"Pemesanan"> | number
    status?: EnumStatusPemesananWithAggregatesFilter<"Pemesanan"> | $Enums.StatusPemesanan
    created_at?: DateTimeWithAggregatesFilter<"Pemesanan"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Pemesanan"> | Date | string
    kamar_id?: StringWithAggregatesFilter<"Pemesanan"> | string
    penghuni_id?: StringWithAggregatesFilter<"Pemesanan"> | string
    properti_id?: StringWithAggregatesFilter<"Pemesanan"> | string
  }

  export type PembayaranWhereInput = {
    AND?: PembayaranWhereInput | PembayaranWhereInput[]
    OR?: PembayaranWhereInput[]
    NOT?: PembayaranWhereInput | PembayaranWhereInput[]
    id?: StringFilter<"Pembayaran"> | string
    metode_bayar?: StringFilter<"Pembayaran"> | string
    bukti?: StringNullableFilter<"Pembayaran"> | string | null
    status?: EnumStatusPembayaranFilter<"Pembayaran"> | $Enums.StatusPembayaran
    tgl_bayar?: DateTimeNullableFilter<"Pembayaran"> | Date | string | null
    created_at?: DateTimeFilter<"Pembayaran"> | Date | string
    updated_at?: DateTimeFilter<"Pembayaran"> | Date | string
    pemesanan_id?: StringFilter<"Pembayaran"> | string
    pemesanan?: XOR<PemesananScalarRelationFilter, PemesananWhereInput>
  }

  export type PembayaranOrderByWithRelationInput = {
    id?: SortOrder
    metode_bayar?: SortOrder
    bukti?: SortOrderInput | SortOrder
    status?: SortOrder
    tgl_bayar?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    pemesanan_id?: SortOrder
    pemesanan?: PemesananOrderByWithRelationInput
  }

  export type PembayaranWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    pemesanan_id?: string
    AND?: PembayaranWhereInput | PembayaranWhereInput[]
    OR?: PembayaranWhereInput[]
    NOT?: PembayaranWhereInput | PembayaranWhereInput[]
    metode_bayar?: StringFilter<"Pembayaran"> | string
    bukti?: StringNullableFilter<"Pembayaran"> | string | null
    status?: EnumStatusPembayaranFilter<"Pembayaran"> | $Enums.StatusPembayaran
    tgl_bayar?: DateTimeNullableFilter<"Pembayaran"> | Date | string | null
    created_at?: DateTimeFilter<"Pembayaran"> | Date | string
    updated_at?: DateTimeFilter<"Pembayaran"> | Date | string
    pemesanan?: XOR<PemesananScalarRelationFilter, PemesananWhereInput>
  }, "id" | "pemesanan_id">

  export type PembayaranOrderByWithAggregationInput = {
    id?: SortOrder
    metode_bayar?: SortOrder
    bukti?: SortOrderInput | SortOrder
    status?: SortOrder
    tgl_bayar?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    pemesanan_id?: SortOrder
    _count?: PembayaranCountOrderByAggregateInput
    _max?: PembayaranMaxOrderByAggregateInput
    _min?: PembayaranMinOrderByAggregateInput
  }

  export type PembayaranScalarWhereWithAggregatesInput = {
    AND?: PembayaranScalarWhereWithAggregatesInput | PembayaranScalarWhereWithAggregatesInput[]
    OR?: PembayaranScalarWhereWithAggregatesInput[]
    NOT?: PembayaranScalarWhereWithAggregatesInput | PembayaranScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pembayaran"> | string
    metode_bayar?: StringWithAggregatesFilter<"Pembayaran"> | string
    bukti?: StringNullableWithAggregatesFilter<"Pembayaran"> | string | null
    status?: EnumStatusPembayaranWithAggregatesFilter<"Pembayaran"> | $Enums.StatusPembayaran
    tgl_bayar?: DateTimeNullableWithAggregatesFilter<"Pembayaran"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Pembayaran"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Pembayaran"> | Date | string
    pemesanan_id?: StringWithAggregatesFilter<"Pembayaran"> | string
  }

  export type PenghuniWhereInput = {
    AND?: PenghuniWhereInput | PenghuniWhereInput[]
    OR?: PenghuniWhereInput[]
    NOT?: PenghuniWhereInput | PenghuniWhereInput[]
    id?: StringFilter<"Penghuni"> | string
    tgl_mulai?: DateTimeFilter<"Penghuni"> | Date | string
    tgl_berakhir?: DateTimeNullableFilter<"Penghuni"> | Date | string | null
    status_sewa?: EnumStatusSewaFilter<"Penghuni"> | $Enums.StatusSewa
    created_at?: DateTimeFilter<"Penghuni"> | Date | string
    updated_at?: DateTimeFilter<"Penghuni"> | Date | string
    user_id?: StringFilter<"Penghuni"> | string
    kamar_id?: StringNullableFilter<"Penghuni"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    kamar?: XOR<KamarNullableScalarRelationFilter, KamarWhereInput> | null
    pemesanan?: PemesananListRelationFilter
    komplain?: KomplainListRelationFilter
  }

  export type PenghuniOrderByWithRelationInput = {
    id?: SortOrder
    tgl_mulai?: SortOrder
    tgl_berakhir?: SortOrderInput | SortOrder
    status_sewa?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    kamar_id?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    kamar?: KamarOrderByWithRelationInput
    pemesanan?: PemesananOrderByRelationAggregateInput
    komplain?: KomplainOrderByRelationAggregateInput
  }

  export type PenghuniWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    kamar_id?: string
    AND?: PenghuniWhereInput | PenghuniWhereInput[]
    OR?: PenghuniWhereInput[]
    NOT?: PenghuniWhereInput | PenghuniWhereInput[]
    tgl_mulai?: DateTimeFilter<"Penghuni"> | Date | string
    tgl_berakhir?: DateTimeNullableFilter<"Penghuni"> | Date | string | null
    status_sewa?: EnumStatusSewaFilter<"Penghuni"> | $Enums.StatusSewa
    created_at?: DateTimeFilter<"Penghuni"> | Date | string
    updated_at?: DateTimeFilter<"Penghuni"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    kamar?: XOR<KamarNullableScalarRelationFilter, KamarWhereInput> | null
    pemesanan?: PemesananListRelationFilter
    komplain?: KomplainListRelationFilter
  }, "id" | "user_id" | "kamar_id">

  export type PenghuniOrderByWithAggregationInput = {
    id?: SortOrder
    tgl_mulai?: SortOrder
    tgl_berakhir?: SortOrderInput | SortOrder
    status_sewa?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    kamar_id?: SortOrderInput | SortOrder
    _count?: PenghuniCountOrderByAggregateInput
    _max?: PenghuniMaxOrderByAggregateInput
    _min?: PenghuniMinOrderByAggregateInput
  }

  export type PenghuniScalarWhereWithAggregatesInput = {
    AND?: PenghuniScalarWhereWithAggregatesInput | PenghuniScalarWhereWithAggregatesInput[]
    OR?: PenghuniScalarWhereWithAggregatesInput[]
    NOT?: PenghuniScalarWhereWithAggregatesInput | PenghuniScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Penghuni"> | string
    tgl_mulai?: DateTimeWithAggregatesFilter<"Penghuni"> | Date | string
    tgl_berakhir?: DateTimeNullableWithAggregatesFilter<"Penghuni"> | Date | string | null
    status_sewa?: EnumStatusSewaWithAggregatesFilter<"Penghuni"> | $Enums.StatusSewa
    created_at?: DateTimeWithAggregatesFilter<"Penghuni"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Penghuni"> | Date | string
    user_id?: StringWithAggregatesFilter<"Penghuni"> | string
    kamar_id?: StringNullableWithAggregatesFilter<"Penghuni"> | string | null
  }

  export type OperatorWhereInput = {
    AND?: OperatorWhereInput | OperatorWhereInput[]
    OR?: OperatorWhereInput[]
    NOT?: OperatorWhereInput | OperatorWhereInput[]
    id?: StringFilter<"Operator"> | string
    created_at?: DateTimeFilter<"Operator"> | Date | string
    updated_at?: DateTimeFilter<"Operator"> | Date | string
    user_id?: StringFilter<"Operator"> | string
    properti_id?: StringFilter<"Operator"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    properti?: XOR<PropertiScalarRelationFilter, PropertiWhereInput>
    pengajuanDana?: PengajuanDanaListRelationFilter
  }

  export type OperatorOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    properti_id?: SortOrder
    user?: UserOrderByWithRelationInput
    properti?: PropertiOrderByWithRelationInput
    pengajuanDana?: PengajuanDanaOrderByRelationAggregateInput
  }

  export type OperatorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    user_id_properti_id?: OperatorUser_idProperti_idCompoundUniqueInput
    AND?: OperatorWhereInput | OperatorWhereInput[]
    OR?: OperatorWhereInput[]
    NOT?: OperatorWhereInput | OperatorWhereInput[]
    created_at?: DateTimeFilter<"Operator"> | Date | string
    updated_at?: DateTimeFilter<"Operator"> | Date | string
    properti_id?: StringFilter<"Operator"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    properti?: XOR<PropertiScalarRelationFilter, PropertiWhereInput>
    pengajuanDana?: PengajuanDanaListRelationFilter
  }, "id" | "user_id" | "user_id_properti_id">

  export type OperatorOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    properti_id?: SortOrder
    _count?: OperatorCountOrderByAggregateInput
    _max?: OperatorMaxOrderByAggregateInput
    _min?: OperatorMinOrderByAggregateInput
  }

  export type OperatorScalarWhereWithAggregatesInput = {
    AND?: OperatorScalarWhereWithAggregatesInput | OperatorScalarWhereWithAggregatesInput[]
    OR?: OperatorScalarWhereWithAggregatesInput[]
    NOT?: OperatorScalarWhereWithAggregatesInput | OperatorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Operator"> | string
    created_at?: DateTimeWithAggregatesFilter<"Operator"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Operator"> | Date | string
    user_id?: StringWithAggregatesFilter<"Operator"> | string
    properti_id?: StringWithAggregatesFilter<"Operator"> | string
  }

  export type KomplainWhereInput = {
    AND?: KomplainWhereInput | KomplainWhereInput[]
    OR?: KomplainWhereInput[]
    NOT?: KomplainWhereInput | KomplainWhereInput[]
    id?: StringFilter<"Komplain"> | string
    masalah?: StringFilter<"Komplain"> | string
    jenis?: EnumJenisKomplainFilter<"Komplain"> | $Enums.JenisKomplain
    deskripsi?: StringFilter<"Komplain"> | string
    foto?: StringNullableFilter<"Komplain"> | string | null
    status?: EnumStatusKomplainFilter<"Komplain"> | $Enums.StatusKomplain
    created_at?: DateTimeFilter<"Komplain"> | Date | string
    updated_at?: DateTimeFilter<"Komplain"> | Date | string
    penghuni_id?: StringFilter<"Komplain"> | string
    properti_id?: StringFilter<"Komplain"> | string
    penghuni?: XOR<PenghuniScalarRelationFilter, PenghuniWhereInput>
    properti?: XOR<PropertiScalarRelationFilter, PropertiWhereInput>
  }

  export type KomplainOrderByWithRelationInput = {
    id?: SortOrder
    masalah?: SortOrder
    jenis?: SortOrder
    deskripsi?: SortOrder
    foto?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    penghuni_id?: SortOrder
    properti_id?: SortOrder
    penghuni?: PenghuniOrderByWithRelationInput
    properti?: PropertiOrderByWithRelationInput
  }

  export type KomplainWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: KomplainWhereInput | KomplainWhereInput[]
    OR?: KomplainWhereInput[]
    NOT?: KomplainWhereInput | KomplainWhereInput[]
    masalah?: StringFilter<"Komplain"> | string
    jenis?: EnumJenisKomplainFilter<"Komplain"> | $Enums.JenisKomplain
    deskripsi?: StringFilter<"Komplain"> | string
    foto?: StringNullableFilter<"Komplain"> | string | null
    status?: EnumStatusKomplainFilter<"Komplain"> | $Enums.StatusKomplain
    created_at?: DateTimeFilter<"Komplain"> | Date | string
    updated_at?: DateTimeFilter<"Komplain"> | Date | string
    penghuni_id?: StringFilter<"Komplain"> | string
    properti_id?: StringFilter<"Komplain"> | string
    penghuni?: XOR<PenghuniScalarRelationFilter, PenghuniWhereInput>
    properti?: XOR<PropertiScalarRelationFilter, PropertiWhereInput>
  }, "id">

  export type KomplainOrderByWithAggregationInput = {
    id?: SortOrder
    masalah?: SortOrder
    jenis?: SortOrder
    deskripsi?: SortOrder
    foto?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    penghuni_id?: SortOrder
    properti_id?: SortOrder
    _count?: KomplainCountOrderByAggregateInput
    _max?: KomplainMaxOrderByAggregateInput
    _min?: KomplainMinOrderByAggregateInput
  }

  export type KomplainScalarWhereWithAggregatesInput = {
    AND?: KomplainScalarWhereWithAggregatesInput | KomplainScalarWhereWithAggregatesInput[]
    OR?: KomplainScalarWhereWithAggregatesInput[]
    NOT?: KomplainScalarWhereWithAggregatesInput | KomplainScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Komplain"> | string
    masalah?: StringWithAggregatesFilter<"Komplain"> | string
    jenis?: EnumJenisKomplainWithAggregatesFilter<"Komplain"> | $Enums.JenisKomplain
    deskripsi?: StringWithAggregatesFilter<"Komplain"> | string
    foto?: StringNullableWithAggregatesFilter<"Komplain"> | string | null
    status?: EnumStatusKomplainWithAggregatesFilter<"Komplain"> | $Enums.StatusKomplain
    created_at?: DateTimeWithAggregatesFilter<"Komplain"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Komplain"> | Date | string
    penghuni_id?: StringWithAggregatesFilter<"Komplain"> | string
    properti_id?: StringWithAggregatesFilter<"Komplain"> | string
  }

  export type PengajuanDanaWhereInput = {
    AND?: PengajuanDanaWhereInput | PengajuanDanaWhereInput[]
    OR?: PengajuanDanaWhereInput[]
    NOT?: PengajuanDanaWhereInput | PengajuanDanaWhereInput[]
    id?: StringFilter<"PengajuanDana"> | string
    tujuan?: StringFilter<"PengajuanDana"> | string
    jumlah?: IntFilter<"PengajuanDana"> | number
    no_rekening?: StringFilter<"PengajuanDana"> | string
    foto?: StringNullableFilter<"PengajuanDana"> | string | null
    status?: EnumStatusDanaFilter<"PengajuanDana"> | $Enums.StatusDana
    created_at?: DateTimeFilter<"PengajuanDana"> | Date | string
    updated_at?: DateTimeFilter<"PengajuanDana"> | Date | string
    operator_id?: StringFilter<"PengajuanDana"> | string
    properti_id?: StringFilter<"PengajuanDana"> | string
    operator?: XOR<OperatorScalarRelationFilter, OperatorWhereInput>
    properti?: XOR<PropertiScalarRelationFilter, PropertiWhereInput>
  }

  export type PengajuanDanaOrderByWithRelationInput = {
    id?: SortOrder
    tujuan?: SortOrder
    jumlah?: SortOrder
    no_rekening?: SortOrder
    foto?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    operator_id?: SortOrder
    properti_id?: SortOrder
    operator?: OperatorOrderByWithRelationInput
    properti?: PropertiOrderByWithRelationInput
  }

  export type PengajuanDanaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PengajuanDanaWhereInput | PengajuanDanaWhereInput[]
    OR?: PengajuanDanaWhereInput[]
    NOT?: PengajuanDanaWhereInput | PengajuanDanaWhereInput[]
    tujuan?: StringFilter<"PengajuanDana"> | string
    jumlah?: IntFilter<"PengajuanDana"> | number
    no_rekening?: StringFilter<"PengajuanDana"> | string
    foto?: StringNullableFilter<"PengajuanDana"> | string | null
    status?: EnumStatusDanaFilter<"PengajuanDana"> | $Enums.StatusDana
    created_at?: DateTimeFilter<"PengajuanDana"> | Date | string
    updated_at?: DateTimeFilter<"PengajuanDana"> | Date | string
    operator_id?: StringFilter<"PengajuanDana"> | string
    properti_id?: StringFilter<"PengajuanDana"> | string
    operator?: XOR<OperatorScalarRelationFilter, OperatorWhereInput>
    properti?: XOR<PropertiScalarRelationFilter, PropertiWhereInput>
  }, "id">

  export type PengajuanDanaOrderByWithAggregationInput = {
    id?: SortOrder
    tujuan?: SortOrder
    jumlah?: SortOrder
    no_rekening?: SortOrder
    foto?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    operator_id?: SortOrder
    properti_id?: SortOrder
    _count?: PengajuanDanaCountOrderByAggregateInput
    _avg?: PengajuanDanaAvgOrderByAggregateInput
    _max?: PengajuanDanaMaxOrderByAggregateInput
    _min?: PengajuanDanaMinOrderByAggregateInput
    _sum?: PengajuanDanaSumOrderByAggregateInput
  }

  export type PengajuanDanaScalarWhereWithAggregatesInput = {
    AND?: PengajuanDanaScalarWhereWithAggregatesInput | PengajuanDanaScalarWhereWithAggregatesInput[]
    OR?: PengajuanDanaScalarWhereWithAggregatesInput[]
    NOT?: PengajuanDanaScalarWhereWithAggregatesInput | PengajuanDanaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PengajuanDana"> | string
    tujuan?: StringWithAggregatesFilter<"PengajuanDana"> | string
    jumlah?: IntWithAggregatesFilter<"PengajuanDana"> | number
    no_rekening?: StringWithAggregatesFilter<"PengajuanDana"> | string
    foto?: StringNullableWithAggregatesFilter<"PengajuanDana"> | string | null
    status?: EnumStatusDanaWithAggregatesFilter<"PengajuanDana"> | $Enums.StatusDana
    created_at?: DateTimeWithAggregatesFilter<"PengajuanDana"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PengajuanDana"> | Date | string
    operator_id?: StringWithAggregatesFilter<"PengajuanDana"> | string
    properti_id?: StringWithAggregatesFilter<"PengajuanDana"> | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    penghuni?: PenghuniCreateNestedOneWithoutUserInput
    operator?: OperatorCreateNestedOneWithoutUserInput
    properti?: PropertiCreateNestedManyWithoutAdminInput
    settings?: AdminSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    penghuni?: PenghuniUncheckedCreateNestedOneWithoutUserInput
    operator?: OperatorUncheckedCreateNestedOneWithoutUserInput
    properti?: PropertiUncheckedCreateNestedManyWithoutAdminInput
    settings?: AdminSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUpdateOneWithoutUserNestedInput
    operator?: OperatorUpdateOneWithoutUserNestedInput
    properti?: PropertiUpdateManyWithoutAdminNestedInput
    settings?: AdminSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUncheckedUpdateOneWithoutUserNestedInput
    operator?: OperatorUncheckedUpdateOneWithoutUserNestedInput
    properti?: PropertiUncheckedUpdateManyWithoutAdminNestedInput
    settings?: AdminSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingsCreateInput = {
    id?: string
    nama_rekening?: string | null
    nomor_rekening?: string | null
    bank?: string | null
    qris_image?: string | null
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutSettingsInput
  }

  export type AdminSettingsUncheckedCreateInput = {
    id?: string
    nama_rekening?: string | null
    nomor_rekening?: string | null
    bank?: string | null
    qris_image?: string | null
    updated_at?: Date | string
    user_id: string
  }

  export type AdminSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    nomor_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    bank?: NullableStringFieldUpdateOperationsInput | string | null
    qris_image?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSettingsNestedInput
  }

  export type AdminSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    nomor_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    bank?: NullableStringFieldUpdateOperationsInput | string | null
    qris_image?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type AdminSettingsCreateManyInput = {
    id?: string
    nama_rekening?: string | null
    nomor_rekening?: string | null
    bank?: string | null
    qris_image?: string | null
    updated_at?: Date | string
    user_id: string
  }

  export type AdminSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    nomor_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    bank?: NullableStringFieldUpdateOperationsInput | string | null
    qris_image?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    nomor_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    bank?: NullableStringFieldUpdateOperationsInput | string | null
    qris_image?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type PropertiCreateInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin: UserCreateNestedOneWithoutPropertiInput
    kamar?: KamarCreateNestedManyWithoutPropertiInput
    komplain?: KomplainCreateNestedManyWithoutPropertiInput
    operator?: OperatorCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaCreateNestedManyWithoutPropertiInput
  }

  export type PropertiUncheckedCreateInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin_id: string
    kamar?: KamarUncheckedCreateNestedManyWithoutPropertiInput
    komplain?: KomplainUncheckedCreateNestedManyWithoutPropertiInput
    operator?: OperatorUncheckedCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaUncheckedCreateNestedManyWithoutPropertiInput
  }

  export type PropertiUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutPropertiNestedInput
    kamar?: KamarUpdateManyWithoutPropertiNestedInput
    komplain?: KomplainUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUpdateManyWithoutPropertiNestedInput
  }

  export type PropertiUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: StringFieldUpdateOperationsInput | string
    kamar?: KamarUncheckedUpdateManyWithoutPropertiNestedInput
    komplain?: KomplainUncheckedUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUncheckedUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUncheckedUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUncheckedUpdateManyWithoutPropertiNestedInput
  }

  export type PropertiCreateManyInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin_id: string
  }

  export type PropertiUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertiUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: StringFieldUpdateOperationsInput | string
  }

  export type KamarCreateInput = {
    id?: string
    nomor: string
    tipe?: $Enums.TipeKamar
    luas?: string | null
    fasilitas?: KamarCreatefasilitasInput | string[]
    deskripsi?: string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarCreategambarInput | string[]
    status?: $Enums.StatusKamar
    created_at?: Date | string
    updated_at?: Date | string
    properti: PropertiCreateNestedOneWithoutKamarInput
    pemesanan?: PemesananCreateNestedManyWithoutKamarInput
    penghuni?: PenghuniCreateNestedOneWithoutKamarInput
  }

  export type KamarUncheckedCreateInput = {
    id?: string
    nomor: string
    tipe?: $Enums.TipeKamar
    luas?: string | null
    fasilitas?: KamarCreatefasilitasInput | string[]
    deskripsi?: string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarCreategambarInput | string[]
    status?: $Enums.StatusKamar
    created_at?: Date | string
    updated_at?: Date | string
    properti_id: string
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutKamarInput
    penghuni?: PenghuniUncheckedCreateNestedOneWithoutKamarInput
  }

  export type KamarUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti?: PropertiUpdateOneRequiredWithoutKamarNestedInput
    pemesanan?: PemesananUpdateManyWithoutKamarNestedInput
    penghuni?: PenghuniUpdateOneWithoutKamarNestedInput
  }

  export type KamarUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti_id?: StringFieldUpdateOperationsInput | string
    pemesanan?: PemesananUncheckedUpdateManyWithoutKamarNestedInput
    penghuni?: PenghuniUncheckedUpdateOneWithoutKamarNestedInput
  }

  export type KamarCreateManyInput = {
    id?: string
    nomor: string
    tipe?: $Enums.TipeKamar
    luas?: string | null
    fasilitas?: KamarCreatefasilitasInput | string[]
    deskripsi?: string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarCreategambarInput | string[]
    status?: $Enums.StatusKamar
    created_at?: Date | string
    updated_at?: Date | string
    properti_id: string
  }

  export type KamarUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KamarUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type PemesananCreateInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar: KamarCreateNestedOneWithoutPemesananInput
    penghuni: PenghuniCreateNestedOneWithoutPemesananInput
    properti: PropertiCreateNestedOneWithoutPemesananInput
    pembayaran?: PembayaranCreateNestedOneWithoutPemesananInput
  }

  export type PemesananUncheckedCreateInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar_id: string
    penghuni_id: string
    properti_id: string
    pembayaran?: PembayaranUncheckedCreateNestedOneWithoutPemesananInput
  }

  export type PemesananUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar?: KamarUpdateOneRequiredWithoutPemesananNestedInput
    penghuni?: PenghuniUpdateOneRequiredWithoutPemesananNestedInput
    properti?: PropertiUpdateOneRequiredWithoutPemesananNestedInput
    pembayaran?: PembayaranUpdateOneWithoutPemesananNestedInput
  }

  export type PemesananUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar_id?: StringFieldUpdateOperationsInput | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
    pembayaran?: PembayaranUncheckedUpdateOneWithoutPemesananNestedInput
  }

  export type PemesananCreateManyInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar_id: string
    penghuni_id: string
    properti_id: string
  }

  export type PemesananUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PemesananUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar_id?: StringFieldUpdateOperationsInput | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type PembayaranCreateInput = {
    id?: string
    metode_bayar: string
    bukti?: string | null
    status?: $Enums.StatusPembayaran
    tgl_bayar?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    pemesanan: PemesananCreateNestedOneWithoutPembayaranInput
  }

  export type PembayaranUncheckedCreateInput = {
    id?: string
    metode_bayar: string
    bukti?: string | null
    status?: $Enums.StatusPembayaran
    tgl_bayar?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    pemesanan_id: string
  }

  export type PembayaranUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    bukti?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusPembayaranFieldUpdateOperationsInput | $Enums.StatusPembayaran
    tgl_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    pemesanan?: PemesananUpdateOneRequiredWithoutPembayaranNestedInput
  }

  export type PembayaranUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    bukti?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusPembayaranFieldUpdateOperationsInput | $Enums.StatusPembayaran
    tgl_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    pemesanan_id?: StringFieldUpdateOperationsInput | string
  }

  export type PembayaranCreateManyInput = {
    id?: string
    metode_bayar: string
    bukti?: string | null
    status?: $Enums.StatusPembayaran
    tgl_bayar?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    pemesanan_id: string
  }

  export type PembayaranUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    bukti?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusPembayaranFieldUpdateOperationsInput | $Enums.StatusPembayaran
    tgl_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PembayaranUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    bukti?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusPembayaranFieldUpdateOperationsInput | $Enums.StatusPembayaran
    tgl_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    pemesanan_id?: StringFieldUpdateOperationsInput | string
  }

  export type PenghuniCreateInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutPenghuniInput
    kamar?: KamarCreateNestedOneWithoutPenghuniInput
    pemesanan?: PemesananCreateNestedManyWithoutPenghuniInput
    komplain?: KomplainCreateNestedManyWithoutPenghuniInput
  }

  export type PenghuniUncheckedCreateInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    kamar_id?: string | null
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutPenghuniInput
    komplain?: KomplainUncheckedCreateNestedManyWithoutPenghuniInput
  }

  export type PenghuniUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPenghuniNestedInput
    kamar?: KamarUpdateOneWithoutPenghuniNestedInput
    pemesanan?: PemesananUpdateManyWithoutPenghuniNestedInput
    komplain?: KomplainUpdateManyWithoutPenghuniNestedInput
  }

  export type PenghuniUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    kamar_id?: NullableStringFieldUpdateOperationsInput | string | null
    pemesanan?: PemesananUncheckedUpdateManyWithoutPenghuniNestedInput
    komplain?: KomplainUncheckedUpdateManyWithoutPenghuniNestedInput
  }

  export type PenghuniCreateManyInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    kamar_id?: string | null
  }

  export type PenghuniUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PenghuniUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    kamar_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OperatorCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutOperatorInput
    properti: PropertiCreateNestedOneWithoutOperatorInput
    pengajuanDana?: PengajuanDanaCreateNestedManyWithoutOperatorInput
  }

  export type OperatorUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    properti_id: string
    pengajuanDana?: PengajuanDanaUncheckedCreateNestedManyWithoutOperatorInput
  }

  export type OperatorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOperatorNestedInput
    properti?: PropertiUpdateOneRequiredWithoutOperatorNestedInput
    pengajuanDana?: PengajuanDanaUpdateManyWithoutOperatorNestedInput
  }

  export type OperatorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
    pengajuanDana?: PengajuanDanaUncheckedUpdateManyWithoutOperatorNestedInput
  }

  export type OperatorCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    properti_id: string
  }

  export type OperatorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperatorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type KomplainCreateInput = {
    id?: string
    masalah: string
    jenis: $Enums.JenisKomplain
    deskripsi: string
    foto?: string | null
    status?: $Enums.StatusKomplain
    created_at?: Date | string
    updated_at?: Date | string
    penghuni: PenghuniCreateNestedOneWithoutKomplainInput
    properti: PropertiCreateNestedOneWithoutKomplainInput
  }

  export type KomplainUncheckedCreateInput = {
    id?: string
    masalah: string
    jenis: $Enums.JenisKomplain
    deskripsi: string
    foto?: string | null
    status?: $Enums.StatusKomplain
    created_at?: Date | string
    updated_at?: Date | string
    penghuni_id: string
    properti_id: string
  }

  export type KomplainUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    masalah?: StringFieldUpdateOperationsInput | string
    jenis?: EnumJenisKomplainFieldUpdateOperationsInput | $Enums.JenisKomplain
    deskripsi?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKomplainFieldUpdateOperationsInput | $Enums.StatusKomplain
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUpdateOneRequiredWithoutKomplainNestedInput
    properti?: PropertiUpdateOneRequiredWithoutKomplainNestedInput
  }

  export type KomplainUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    masalah?: StringFieldUpdateOperationsInput | string
    jenis?: EnumJenisKomplainFieldUpdateOperationsInput | $Enums.JenisKomplain
    deskripsi?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKomplainFieldUpdateOperationsInput | $Enums.StatusKomplain
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type KomplainCreateManyInput = {
    id?: string
    masalah: string
    jenis: $Enums.JenisKomplain
    deskripsi: string
    foto?: string | null
    status?: $Enums.StatusKomplain
    created_at?: Date | string
    updated_at?: Date | string
    penghuni_id: string
    properti_id: string
  }

  export type KomplainUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    masalah?: StringFieldUpdateOperationsInput | string
    jenis?: EnumJenisKomplainFieldUpdateOperationsInput | $Enums.JenisKomplain
    deskripsi?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKomplainFieldUpdateOperationsInput | $Enums.StatusKomplain
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KomplainUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    masalah?: StringFieldUpdateOperationsInput | string
    jenis?: EnumJenisKomplainFieldUpdateOperationsInput | $Enums.JenisKomplain
    deskripsi?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKomplainFieldUpdateOperationsInput | $Enums.StatusKomplain
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type PengajuanDanaCreateInput = {
    id?: string
    tujuan: string
    jumlah: number
    no_rekening: string
    foto?: string | null
    status?: $Enums.StatusDana
    created_at?: Date | string
    updated_at?: Date | string
    operator: OperatorCreateNestedOneWithoutPengajuanDanaInput
    properti: PropertiCreateNestedOneWithoutPengajuanDanaInput
  }

  export type PengajuanDanaUncheckedCreateInput = {
    id?: string
    tujuan: string
    jumlah: number
    no_rekening: string
    foto?: string | null
    status?: $Enums.StatusDana
    created_at?: Date | string
    updated_at?: Date | string
    operator_id: string
    properti_id: string
  }

  export type PengajuanDanaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tujuan?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    no_rekening?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusDanaFieldUpdateOperationsInput | $Enums.StatusDana
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operator?: OperatorUpdateOneRequiredWithoutPengajuanDanaNestedInput
    properti?: PropertiUpdateOneRequiredWithoutPengajuanDanaNestedInput
  }

  export type PengajuanDanaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tujuan?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    no_rekening?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusDanaFieldUpdateOperationsInput | $Enums.StatusDana
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operator_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type PengajuanDanaCreateManyInput = {
    id?: string
    tujuan: string
    jumlah: number
    no_rekening: string
    foto?: string | null
    status?: $Enums.StatusDana
    created_at?: Date | string
    updated_at?: Date | string
    operator_id: string
    properti_id: string
  }

  export type PengajuanDanaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tujuan?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    no_rekening?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusDanaFieldUpdateOperationsInput | $Enums.StatusDana
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PengajuanDanaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tujuan?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    no_rekening?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusDanaFieldUpdateOperationsInput | $Enums.StatusDana
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operator_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PenghuniNullableScalarRelationFilter = {
    is?: PenghuniWhereInput | null
    isNot?: PenghuniWhereInput | null
  }

  export type OperatorNullableScalarRelationFilter = {
    is?: OperatorWhereInput | null
    isNot?: OperatorWhereInput | null
  }

  export type PropertiListRelationFilter = {
    every?: PropertiWhereInput
    some?: PropertiWhereInput
    none?: PropertiWhereInput
  }

  export type AdminSettingsNullableScalarRelationFilter = {
    is?: AdminSettingsWhereInput | null
    isNot?: AdminSettingsWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PropertiOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    no_telepon?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    no_telepon?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    no_telepon?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AdminSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    nama_rekening?: SortOrder
    nomor_rekening?: SortOrder
    bank?: SortOrder
    qris_image?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
  }

  export type AdminSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    nama_rekening?: SortOrder
    nomor_rekening?: SortOrder
    bank?: SortOrder
    qris_image?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
  }

  export type AdminSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    nama_rekening?: SortOrder
    nomor_rekening?: SortOrder
    bank?: SortOrder
    qris_image?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
  }

  export type EnumJenisPropertiNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisProperti | EnumJenisPropertiFieldRefInput<$PrismaModel> | null
    in?: $Enums.JenisProperti[] | ListEnumJenisPropertiFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JenisProperti[] | ListEnumJenisPropertiFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJenisPropertiNullableFilter<$PrismaModel> | $Enums.JenisProperti | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type KamarListRelationFilter = {
    every?: KamarWhereInput
    some?: KamarWhereInput
    none?: KamarWhereInput
  }

  export type KomplainListRelationFilter = {
    every?: KomplainWhereInput
    some?: KomplainWhereInput
    none?: KomplainWhereInput
  }

  export type OperatorListRelationFilter = {
    every?: OperatorWhereInput
    some?: OperatorWhereInput
    none?: OperatorWhereInput
  }

  export type PemesananListRelationFilter = {
    every?: PemesananWhereInput
    some?: PemesananWhereInput
    none?: PemesananWhereInput
  }

  export type PengajuanDanaListRelationFilter = {
    every?: PengajuanDanaWhereInput
    some?: PengajuanDanaWhereInput
    none?: PengajuanDanaWhereInput
  }

  export type KamarOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KomplainOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OperatorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PemesananOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PengajuanDanaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertiCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    alamat?: SortOrder
    jenis?: SortOrder
    deskripsi?: SortOrder
    kebijakan?: SortOrder
    gambar?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    admin_id?: SortOrder
  }

  export type PropertiMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    alamat?: SortOrder
    jenis?: SortOrder
    deskripsi?: SortOrder
    kebijakan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    admin_id?: SortOrder
  }

  export type PropertiMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    alamat?: SortOrder
    jenis?: SortOrder
    deskripsi?: SortOrder
    kebijakan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    admin_id?: SortOrder
  }

  export type EnumJenisPropertiNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisProperti | EnumJenisPropertiFieldRefInput<$PrismaModel> | null
    in?: $Enums.JenisProperti[] | ListEnumJenisPropertiFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JenisProperti[] | ListEnumJenisPropertiFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJenisPropertiNullableWithAggregatesFilter<$PrismaModel> | $Enums.JenisProperti | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumJenisPropertiNullableFilter<$PrismaModel>
    _max?: NestedEnumJenisPropertiNullableFilter<$PrismaModel>
  }

  export type EnumTipeKamarFilter<$PrismaModel = never> = {
    equals?: $Enums.TipeKamar | EnumTipeKamarFieldRefInput<$PrismaModel>
    in?: $Enums.TipeKamar[] | ListEnumTipeKamarFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipeKamar[] | ListEnumTipeKamarFieldRefInput<$PrismaModel>
    not?: NestedEnumTipeKamarFilter<$PrismaModel> | $Enums.TipeKamar
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumStatusKamarFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKamar | EnumStatusKamarFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKamar[] | ListEnumStatusKamarFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKamar[] | ListEnumStatusKamarFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKamarFilter<$PrismaModel> | $Enums.StatusKamar
  }

  export type PropertiScalarRelationFilter = {
    is?: PropertiWhereInput
    isNot?: PropertiWhereInput
  }

  export type KamarProperti_idNomorCompoundUniqueInput = {
    properti_id: string
    nomor: string
  }

  export type KamarCountOrderByAggregateInput = {
    id?: SortOrder
    nomor?: SortOrder
    tipe?: SortOrder
    luas?: SortOrder
    fasilitas?: SortOrder
    deskripsi?: SortOrder
    tarif?: SortOrder
    gambar?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    properti_id?: SortOrder
  }

  export type KamarMaxOrderByAggregateInput = {
    id?: SortOrder
    nomor?: SortOrder
    tipe?: SortOrder
    luas?: SortOrder
    deskripsi?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    properti_id?: SortOrder
  }

  export type KamarMinOrderByAggregateInput = {
    id?: SortOrder
    nomor?: SortOrder
    tipe?: SortOrder
    luas?: SortOrder
    deskripsi?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    properti_id?: SortOrder
  }

  export type EnumTipeKamarWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipeKamar | EnumTipeKamarFieldRefInput<$PrismaModel>
    in?: $Enums.TipeKamar[] | ListEnumTipeKamarFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipeKamar[] | ListEnumTipeKamarFieldRefInput<$PrismaModel>
    not?: NestedEnumTipeKamarWithAggregatesFilter<$PrismaModel> | $Enums.TipeKamar
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipeKamarFilter<$PrismaModel>
    _max?: NestedEnumTipeKamarFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumStatusKamarWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKamar | EnumStatusKamarFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKamar[] | ListEnumStatusKamarFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKamar[] | ListEnumStatusKamarFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKamarWithAggregatesFilter<$PrismaModel> | $Enums.StatusKamar
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKamarFilter<$PrismaModel>
    _max?: NestedEnumStatusKamarFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumStatusPemesananFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPemesanan | EnumStatusPemesananFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPemesanan[] | ListEnumStatusPemesananFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPemesanan[] | ListEnumStatusPemesananFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPemesananFilter<$PrismaModel> | $Enums.StatusPemesanan
  }

  export type KamarScalarRelationFilter = {
    is?: KamarWhereInput
    isNot?: KamarWhereInput
  }

  export type PenghuniScalarRelationFilter = {
    is?: PenghuniWhereInput
    isNot?: PenghuniWhereInput
  }

  export type PembayaranNullableScalarRelationFilter = {
    is?: PembayaranWhereInput | null
    isNot?: PembayaranWhereInput | null
  }

  export type PemesananCountOrderByAggregateInput = {
    id?: SortOrder
    durasi_sewa?: SortOrder
    tgl_masuk?: SortOrder
    metode_bayar?: SortOrder
    total_bayar?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    kamar_id?: SortOrder
    penghuni_id?: SortOrder
    properti_id?: SortOrder
  }

  export type PemesananAvgOrderByAggregateInput = {
    durasi_sewa?: SortOrder
    total_bayar?: SortOrder
  }

  export type PemesananMaxOrderByAggregateInput = {
    id?: SortOrder
    durasi_sewa?: SortOrder
    tgl_masuk?: SortOrder
    metode_bayar?: SortOrder
    total_bayar?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    kamar_id?: SortOrder
    penghuni_id?: SortOrder
    properti_id?: SortOrder
  }

  export type PemesananMinOrderByAggregateInput = {
    id?: SortOrder
    durasi_sewa?: SortOrder
    tgl_masuk?: SortOrder
    metode_bayar?: SortOrder
    total_bayar?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    kamar_id?: SortOrder
    penghuni_id?: SortOrder
    properti_id?: SortOrder
  }

  export type PemesananSumOrderByAggregateInput = {
    durasi_sewa?: SortOrder
    total_bayar?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumStatusPemesananWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPemesanan | EnumStatusPemesananFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPemesanan[] | ListEnumStatusPemesananFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPemesanan[] | ListEnumStatusPemesananFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPemesananWithAggregatesFilter<$PrismaModel> | $Enums.StatusPemesanan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusPemesananFilter<$PrismaModel>
    _max?: NestedEnumStatusPemesananFilter<$PrismaModel>
  }

  export type EnumStatusPembayaranFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPembayaran | EnumStatusPembayaranFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPembayaran[] | ListEnumStatusPembayaranFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPembayaran[] | ListEnumStatusPembayaranFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPembayaranFilter<$PrismaModel> | $Enums.StatusPembayaran
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PemesananScalarRelationFilter = {
    is?: PemesananWhereInput
    isNot?: PemesananWhereInput
  }

  export type PembayaranCountOrderByAggregateInput = {
    id?: SortOrder
    metode_bayar?: SortOrder
    bukti?: SortOrder
    status?: SortOrder
    tgl_bayar?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    pemesanan_id?: SortOrder
  }

  export type PembayaranMaxOrderByAggregateInput = {
    id?: SortOrder
    metode_bayar?: SortOrder
    bukti?: SortOrder
    status?: SortOrder
    tgl_bayar?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    pemesanan_id?: SortOrder
  }

  export type PembayaranMinOrderByAggregateInput = {
    id?: SortOrder
    metode_bayar?: SortOrder
    bukti?: SortOrder
    status?: SortOrder
    tgl_bayar?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    pemesanan_id?: SortOrder
  }

  export type EnumStatusPembayaranWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPembayaran | EnumStatusPembayaranFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPembayaran[] | ListEnumStatusPembayaranFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPembayaran[] | ListEnumStatusPembayaranFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPembayaranWithAggregatesFilter<$PrismaModel> | $Enums.StatusPembayaran
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusPembayaranFilter<$PrismaModel>
    _max?: NestedEnumStatusPembayaranFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumStatusSewaFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusSewa | EnumStatusSewaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusSewa[] | ListEnumStatusSewaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusSewa[] | ListEnumStatusSewaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusSewaFilter<$PrismaModel> | $Enums.StatusSewa
  }

  export type KamarNullableScalarRelationFilter = {
    is?: KamarWhereInput | null
    isNot?: KamarWhereInput | null
  }

  export type PenghuniCountOrderByAggregateInput = {
    id?: SortOrder
    tgl_mulai?: SortOrder
    tgl_berakhir?: SortOrder
    status_sewa?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    kamar_id?: SortOrder
  }

  export type PenghuniMaxOrderByAggregateInput = {
    id?: SortOrder
    tgl_mulai?: SortOrder
    tgl_berakhir?: SortOrder
    status_sewa?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    kamar_id?: SortOrder
  }

  export type PenghuniMinOrderByAggregateInput = {
    id?: SortOrder
    tgl_mulai?: SortOrder
    tgl_berakhir?: SortOrder
    status_sewa?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    kamar_id?: SortOrder
  }

  export type EnumStatusSewaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusSewa | EnumStatusSewaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusSewa[] | ListEnumStatusSewaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusSewa[] | ListEnumStatusSewaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusSewaWithAggregatesFilter<$PrismaModel> | $Enums.StatusSewa
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusSewaFilter<$PrismaModel>
    _max?: NestedEnumStatusSewaFilter<$PrismaModel>
  }

  export type OperatorUser_idProperti_idCompoundUniqueInput = {
    user_id: string
    properti_id: string
  }

  export type OperatorCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    properti_id?: SortOrder
  }

  export type OperatorMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    properti_id?: SortOrder
  }

  export type OperatorMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    properti_id?: SortOrder
  }

  export type EnumJenisKomplainFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisKomplain | EnumJenisKomplainFieldRefInput<$PrismaModel>
    in?: $Enums.JenisKomplain[] | ListEnumJenisKomplainFieldRefInput<$PrismaModel>
    notIn?: $Enums.JenisKomplain[] | ListEnumJenisKomplainFieldRefInput<$PrismaModel>
    not?: NestedEnumJenisKomplainFilter<$PrismaModel> | $Enums.JenisKomplain
  }

  export type EnumStatusKomplainFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKomplain | EnumStatusKomplainFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKomplain[] | ListEnumStatusKomplainFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKomplain[] | ListEnumStatusKomplainFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKomplainFilter<$PrismaModel> | $Enums.StatusKomplain
  }

  export type KomplainCountOrderByAggregateInput = {
    id?: SortOrder
    masalah?: SortOrder
    jenis?: SortOrder
    deskripsi?: SortOrder
    foto?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    penghuni_id?: SortOrder
    properti_id?: SortOrder
  }

  export type KomplainMaxOrderByAggregateInput = {
    id?: SortOrder
    masalah?: SortOrder
    jenis?: SortOrder
    deskripsi?: SortOrder
    foto?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    penghuni_id?: SortOrder
    properti_id?: SortOrder
  }

  export type KomplainMinOrderByAggregateInput = {
    id?: SortOrder
    masalah?: SortOrder
    jenis?: SortOrder
    deskripsi?: SortOrder
    foto?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    penghuni_id?: SortOrder
    properti_id?: SortOrder
  }

  export type EnumJenisKomplainWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisKomplain | EnumJenisKomplainFieldRefInput<$PrismaModel>
    in?: $Enums.JenisKomplain[] | ListEnumJenisKomplainFieldRefInput<$PrismaModel>
    notIn?: $Enums.JenisKomplain[] | ListEnumJenisKomplainFieldRefInput<$PrismaModel>
    not?: NestedEnumJenisKomplainWithAggregatesFilter<$PrismaModel> | $Enums.JenisKomplain
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJenisKomplainFilter<$PrismaModel>
    _max?: NestedEnumJenisKomplainFilter<$PrismaModel>
  }

  export type EnumStatusKomplainWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKomplain | EnumStatusKomplainFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKomplain[] | ListEnumStatusKomplainFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKomplain[] | ListEnumStatusKomplainFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKomplainWithAggregatesFilter<$PrismaModel> | $Enums.StatusKomplain
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKomplainFilter<$PrismaModel>
    _max?: NestedEnumStatusKomplainFilter<$PrismaModel>
  }

  export type EnumStatusDanaFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusDana | EnumStatusDanaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusDana[] | ListEnumStatusDanaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusDana[] | ListEnumStatusDanaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusDanaFilter<$PrismaModel> | $Enums.StatusDana
  }

  export type OperatorScalarRelationFilter = {
    is?: OperatorWhereInput
    isNot?: OperatorWhereInput
  }

  export type PengajuanDanaCountOrderByAggregateInput = {
    id?: SortOrder
    tujuan?: SortOrder
    jumlah?: SortOrder
    no_rekening?: SortOrder
    foto?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    operator_id?: SortOrder
    properti_id?: SortOrder
  }

  export type PengajuanDanaAvgOrderByAggregateInput = {
    jumlah?: SortOrder
  }

  export type PengajuanDanaMaxOrderByAggregateInput = {
    id?: SortOrder
    tujuan?: SortOrder
    jumlah?: SortOrder
    no_rekening?: SortOrder
    foto?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    operator_id?: SortOrder
    properti_id?: SortOrder
  }

  export type PengajuanDanaMinOrderByAggregateInput = {
    id?: SortOrder
    tujuan?: SortOrder
    jumlah?: SortOrder
    no_rekening?: SortOrder
    foto?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    operator_id?: SortOrder
    properti_id?: SortOrder
  }

  export type PengajuanDanaSumOrderByAggregateInput = {
    jumlah?: SortOrder
  }

  export type EnumStatusDanaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusDana | EnumStatusDanaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusDana[] | ListEnumStatusDanaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusDana[] | ListEnumStatusDanaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusDanaWithAggregatesFilter<$PrismaModel> | $Enums.StatusDana
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusDanaFilter<$PrismaModel>
    _max?: NestedEnumStatusDanaFilter<$PrismaModel>
  }

  export type PenghuniCreateNestedOneWithoutUserInput = {
    create?: XOR<PenghuniCreateWithoutUserInput, PenghuniUncheckedCreateWithoutUserInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutUserInput
    connect?: PenghuniWhereUniqueInput
  }

  export type OperatorCreateNestedOneWithoutUserInput = {
    create?: XOR<OperatorCreateWithoutUserInput, OperatorUncheckedCreateWithoutUserInput>
    connectOrCreate?: OperatorCreateOrConnectWithoutUserInput
    connect?: OperatorWhereUniqueInput
  }

  export type PropertiCreateNestedManyWithoutAdminInput = {
    create?: XOR<PropertiCreateWithoutAdminInput, PropertiUncheckedCreateWithoutAdminInput> | PropertiCreateWithoutAdminInput[] | PropertiUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: PropertiCreateOrConnectWithoutAdminInput | PropertiCreateOrConnectWithoutAdminInput[]
    createMany?: PropertiCreateManyAdminInputEnvelope
    connect?: PropertiWhereUniqueInput | PropertiWhereUniqueInput[]
  }

  export type AdminSettingsCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminSettingsCreateWithoutUserInput, AdminSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminSettingsCreateOrConnectWithoutUserInput
    connect?: AdminSettingsWhereUniqueInput
  }

  export type PenghuniUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PenghuniCreateWithoutUserInput, PenghuniUncheckedCreateWithoutUserInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutUserInput
    connect?: PenghuniWhereUniqueInput
  }

  export type OperatorUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<OperatorCreateWithoutUserInput, OperatorUncheckedCreateWithoutUserInput>
    connectOrCreate?: OperatorCreateOrConnectWithoutUserInput
    connect?: OperatorWhereUniqueInput
  }

  export type PropertiUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<PropertiCreateWithoutAdminInput, PropertiUncheckedCreateWithoutAdminInput> | PropertiCreateWithoutAdminInput[] | PropertiUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: PropertiCreateOrConnectWithoutAdminInput | PropertiCreateOrConnectWithoutAdminInput[]
    createMany?: PropertiCreateManyAdminInputEnvelope
    connect?: PropertiWhereUniqueInput | PropertiWhereUniqueInput[]
  }

  export type AdminSettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminSettingsCreateWithoutUserInput, AdminSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminSettingsCreateOrConnectWithoutUserInput
    connect?: AdminSettingsWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PenghuniUpdateOneWithoutUserNestedInput = {
    create?: XOR<PenghuniCreateWithoutUserInput, PenghuniUncheckedCreateWithoutUserInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutUserInput
    upsert?: PenghuniUpsertWithoutUserInput
    disconnect?: PenghuniWhereInput | boolean
    delete?: PenghuniWhereInput | boolean
    connect?: PenghuniWhereUniqueInput
    update?: XOR<XOR<PenghuniUpdateToOneWithWhereWithoutUserInput, PenghuniUpdateWithoutUserInput>, PenghuniUncheckedUpdateWithoutUserInput>
  }

  export type OperatorUpdateOneWithoutUserNestedInput = {
    create?: XOR<OperatorCreateWithoutUserInput, OperatorUncheckedCreateWithoutUserInput>
    connectOrCreate?: OperatorCreateOrConnectWithoutUserInput
    upsert?: OperatorUpsertWithoutUserInput
    disconnect?: OperatorWhereInput | boolean
    delete?: OperatorWhereInput | boolean
    connect?: OperatorWhereUniqueInput
    update?: XOR<XOR<OperatorUpdateToOneWithWhereWithoutUserInput, OperatorUpdateWithoutUserInput>, OperatorUncheckedUpdateWithoutUserInput>
  }

  export type PropertiUpdateManyWithoutAdminNestedInput = {
    create?: XOR<PropertiCreateWithoutAdminInput, PropertiUncheckedCreateWithoutAdminInput> | PropertiCreateWithoutAdminInput[] | PropertiUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: PropertiCreateOrConnectWithoutAdminInput | PropertiCreateOrConnectWithoutAdminInput[]
    upsert?: PropertiUpsertWithWhereUniqueWithoutAdminInput | PropertiUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: PropertiCreateManyAdminInputEnvelope
    set?: PropertiWhereUniqueInput | PropertiWhereUniqueInput[]
    disconnect?: PropertiWhereUniqueInput | PropertiWhereUniqueInput[]
    delete?: PropertiWhereUniqueInput | PropertiWhereUniqueInput[]
    connect?: PropertiWhereUniqueInput | PropertiWhereUniqueInput[]
    update?: PropertiUpdateWithWhereUniqueWithoutAdminInput | PropertiUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: PropertiUpdateManyWithWhereWithoutAdminInput | PropertiUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: PropertiScalarWhereInput | PropertiScalarWhereInput[]
  }

  export type AdminSettingsUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminSettingsCreateWithoutUserInput, AdminSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminSettingsCreateOrConnectWithoutUserInput
    upsert?: AdminSettingsUpsertWithoutUserInput
    disconnect?: AdminSettingsWhereInput | boolean
    delete?: AdminSettingsWhereInput | boolean
    connect?: AdminSettingsWhereUniqueInput
    update?: XOR<XOR<AdminSettingsUpdateToOneWithWhereWithoutUserInput, AdminSettingsUpdateWithoutUserInput>, AdminSettingsUncheckedUpdateWithoutUserInput>
  }

  export type PenghuniUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PenghuniCreateWithoutUserInput, PenghuniUncheckedCreateWithoutUserInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutUserInput
    upsert?: PenghuniUpsertWithoutUserInput
    disconnect?: PenghuniWhereInput | boolean
    delete?: PenghuniWhereInput | boolean
    connect?: PenghuniWhereUniqueInput
    update?: XOR<XOR<PenghuniUpdateToOneWithWhereWithoutUserInput, PenghuniUpdateWithoutUserInput>, PenghuniUncheckedUpdateWithoutUserInput>
  }

  export type OperatorUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<OperatorCreateWithoutUserInput, OperatorUncheckedCreateWithoutUserInput>
    connectOrCreate?: OperatorCreateOrConnectWithoutUserInput
    upsert?: OperatorUpsertWithoutUserInput
    disconnect?: OperatorWhereInput | boolean
    delete?: OperatorWhereInput | boolean
    connect?: OperatorWhereUniqueInput
    update?: XOR<XOR<OperatorUpdateToOneWithWhereWithoutUserInput, OperatorUpdateWithoutUserInput>, OperatorUncheckedUpdateWithoutUserInput>
  }

  export type PropertiUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<PropertiCreateWithoutAdminInput, PropertiUncheckedCreateWithoutAdminInput> | PropertiCreateWithoutAdminInput[] | PropertiUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: PropertiCreateOrConnectWithoutAdminInput | PropertiCreateOrConnectWithoutAdminInput[]
    upsert?: PropertiUpsertWithWhereUniqueWithoutAdminInput | PropertiUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: PropertiCreateManyAdminInputEnvelope
    set?: PropertiWhereUniqueInput | PropertiWhereUniqueInput[]
    disconnect?: PropertiWhereUniqueInput | PropertiWhereUniqueInput[]
    delete?: PropertiWhereUniqueInput | PropertiWhereUniqueInput[]
    connect?: PropertiWhereUniqueInput | PropertiWhereUniqueInput[]
    update?: PropertiUpdateWithWhereUniqueWithoutAdminInput | PropertiUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: PropertiUpdateManyWithWhereWithoutAdminInput | PropertiUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: PropertiScalarWhereInput | PropertiScalarWhereInput[]
  }

  export type AdminSettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminSettingsCreateWithoutUserInput, AdminSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminSettingsCreateOrConnectWithoutUserInput
    upsert?: AdminSettingsUpsertWithoutUserInput
    disconnect?: AdminSettingsWhereInput | boolean
    delete?: AdminSettingsWhereInput | boolean
    connect?: AdminSettingsWhereUniqueInput
    update?: XOR<XOR<AdminSettingsUpdateToOneWithWhereWithoutUserInput, AdminSettingsUpdateWithoutUserInput>, AdminSettingsUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutSettingsInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    upsert?: UserUpsertWithoutSettingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSettingsInput, UserUpdateWithoutSettingsInput>, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type PropertiCreategambarInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutPropertiInput = {
    create?: XOR<UserCreateWithoutPropertiInput, UserUncheckedCreateWithoutPropertiInput>
    connectOrCreate?: UserCreateOrConnectWithoutPropertiInput
    connect?: UserWhereUniqueInput
  }

  export type KamarCreateNestedManyWithoutPropertiInput = {
    create?: XOR<KamarCreateWithoutPropertiInput, KamarUncheckedCreateWithoutPropertiInput> | KamarCreateWithoutPropertiInput[] | KamarUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: KamarCreateOrConnectWithoutPropertiInput | KamarCreateOrConnectWithoutPropertiInput[]
    createMany?: KamarCreateManyPropertiInputEnvelope
    connect?: KamarWhereUniqueInput | KamarWhereUniqueInput[]
  }

  export type KomplainCreateNestedManyWithoutPropertiInput = {
    create?: XOR<KomplainCreateWithoutPropertiInput, KomplainUncheckedCreateWithoutPropertiInput> | KomplainCreateWithoutPropertiInput[] | KomplainUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: KomplainCreateOrConnectWithoutPropertiInput | KomplainCreateOrConnectWithoutPropertiInput[]
    createMany?: KomplainCreateManyPropertiInputEnvelope
    connect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
  }

  export type OperatorCreateNestedManyWithoutPropertiInput = {
    create?: XOR<OperatorCreateWithoutPropertiInput, OperatorUncheckedCreateWithoutPropertiInput> | OperatorCreateWithoutPropertiInput[] | OperatorUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: OperatorCreateOrConnectWithoutPropertiInput | OperatorCreateOrConnectWithoutPropertiInput[]
    createMany?: OperatorCreateManyPropertiInputEnvelope
    connect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
  }

  export type PemesananCreateNestedManyWithoutPropertiInput = {
    create?: XOR<PemesananCreateWithoutPropertiInput, PemesananUncheckedCreateWithoutPropertiInput> | PemesananCreateWithoutPropertiInput[] | PemesananUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutPropertiInput | PemesananCreateOrConnectWithoutPropertiInput[]
    createMany?: PemesananCreateManyPropertiInputEnvelope
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
  }

  export type PengajuanDanaCreateNestedManyWithoutPropertiInput = {
    create?: XOR<PengajuanDanaCreateWithoutPropertiInput, PengajuanDanaUncheckedCreateWithoutPropertiInput> | PengajuanDanaCreateWithoutPropertiInput[] | PengajuanDanaUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: PengajuanDanaCreateOrConnectWithoutPropertiInput | PengajuanDanaCreateOrConnectWithoutPropertiInput[]
    createMany?: PengajuanDanaCreateManyPropertiInputEnvelope
    connect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
  }

  export type KamarUncheckedCreateNestedManyWithoutPropertiInput = {
    create?: XOR<KamarCreateWithoutPropertiInput, KamarUncheckedCreateWithoutPropertiInput> | KamarCreateWithoutPropertiInput[] | KamarUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: KamarCreateOrConnectWithoutPropertiInput | KamarCreateOrConnectWithoutPropertiInput[]
    createMany?: KamarCreateManyPropertiInputEnvelope
    connect?: KamarWhereUniqueInput | KamarWhereUniqueInput[]
  }

  export type KomplainUncheckedCreateNestedManyWithoutPropertiInput = {
    create?: XOR<KomplainCreateWithoutPropertiInput, KomplainUncheckedCreateWithoutPropertiInput> | KomplainCreateWithoutPropertiInput[] | KomplainUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: KomplainCreateOrConnectWithoutPropertiInput | KomplainCreateOrConnectWithoutPropertiInput[]
    createMany?: KomplainCreateManyPropertiInputEnvelope
    connect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
  }

  export type OperatorUncheckedCreateNestedManyWithoutPropertiInput = {
    create?: XOR<OperatorCreateWithoutPropertiInput, OperatorUncheckedCreateWithoutPropertiInput> | OperatorCreateWithoutPropertiInput[] | OperatorUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: OperatorCreateOrConnectWithoutPropertiInput | OperatorCreateOrConnectWithoutPropertiInput[]
    createMany?: OperatorCreateManyPropertiInputEnvelope
    connect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
  }

  export type PemesananUncheckedCreateNestedManyWithoutPropertiInput = {
    create?: XOR<PemesananCreateWithoutPropertiInput, PemesananUncheckedCreateWithoutPropertiInput> | PemesananCreateWithoutPropertiInput[] | PemesananUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutPropertiInput | PemesananCreateOrConnectWithoutPropertiInput[]
    createMany?: PemesananCreateManyPropertiInputEnvelope
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
  }

  export type PengajuanDanaUncheckedCreateNestedManyWithoutPropertiInput = {
    create?: XOR<PengajuanDanaCreateWithoutPropertiInput, PengajuanDanaUncheckedCreateWithoutPropertiInput> | PengajuanDanaCreateWithoutPropertiInput[] | PengajuanDanaUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: PengajuanDanaCreateOrConnectWithoutPropertiInput | PengajuanDanaCreateOrConnectWithoutPropertiInput[]
    createMany?: PengajuanDanaCreateManyPropertiInputEnvelope
    connect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
  }

  export type NullableEnumJenisPropertiFieldUpdateOperationsInput = {
    set?: $Enums.JenisProperti | null
  }

  export type PropertiUpdategambarInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutPropertiNestedInput = {
    create?: XOR<UserCreateWithoutPropertiInput, UserUncheckedCreateWithoutPropertiInput>
    connectOrCreate?: UserCreateOrConnectWithoutPropertiInput
    upsert?: UserUpsertWithoutPropertiInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPropertiInput, UserUpdateWithoutPropertiInput>, UserUncheckedUpdateWithoutPropertiInput>
  }

  export type KamarUpdateManyWithoutPropertiNestedInput = {
    create?: XOR<KamarCreateWithoutPropertiInput, KamarUncheckedCreateWithoutPropertiInput> | KamarCreateWithoutPropertiInput[] | KamarUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: KamarCreateOrConnectWithoutPropertiInput | KamarCreateOrConnectWithoutPropertiInput[]
    upsert?: KamarUpsertWithWhereUniqueWithoutPropertiInput | KamarUpsertWithWhereUniqueWithoutPropertiInput[]
    createMany?: KamarCreateManyPropertiInputEnvelope
    set?: KamarWhereUniqueInput | KamarWhereUniqueInput[]
    disconnect?: KamarWhereUniqueInput | KamarWhereUniqueInput[]
    delete?: KamarWhereUniqueInput | KamarWhereUniqueInput[]
    connect?: KamarWhereUniqueInput | KamarWhereUniqueInput[]
    update?: KamarUpdateWithWhereUniqueWithoutPropertiInput | KamarUpdateWithWhereUniqueWithoutPropertiInput[]
    updateMany?: KamarUpdateManyWithWhereWithoutPropertiInput | KamarUpdateManyWithWhereWithoutPropertiInput[]
    deleteMany?: KamarScalarWhereInput | KamarScalarWhereInput[]
  }

  export type KomplainUpdateManyWithoutPropertiNestedInput = {
    create?: XOR<KomplainCreateWithoutPropertiInput, KomplainUncheckedCreateWithoutPropertiInput> | KomplainCreateWithoutPropertiInput[] | KomplainUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: KomplainCreateOrConnectWithoutPropertiInput | KomplainCreateOrConnectWithoutPropertiInput[]
    upsert?: KomplainUpsertWithWhereUniqueWithoutPropertiInput | KomplainUpsertWithWhereUniqueWithoutPropertiInput[]
    createMany?: KomplainCreateManyPropertiInputEnvelope
    set?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    disconnect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    delete?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    connect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    update?: KomplainUpdateWithWhereUniqueWithoutPropertiInput | KomplainUpdateWithWhereUniqueWithoutPropertiInput[]
    updateMany?: KomplainUpdateManyWithWhereWithoutPropertiInput | KomplainUpdateManyWithWhereWithoutPropertiInput[]
    deleteMany?: KomplainScalarWhereInput | KomplainScalarWhereInput[]
  }

  export type OperatorUpdateManyWithoutPropertiNestedInput = {
    create?: XOR<OperatorCreateWithoutPropertiInput, OperatorUncheckedCreateWithoutPropertiInput> | OperatorCreateWithoutPropertiInput[] | OperatorUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: OperatorCreateOrConnectWithoutPropertiInput | OperatorCreateOrConnectWithoutPropertiInput[]
    upsert?: OperatorUpsertWithWhereUniqueWithoutPropertiInput | OperatorUpsertWithWhereUniqueWithoutPropertiInput[]
    createMany?: OperatorCreateManyPropertiInputEnvelope
    set?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    disconnect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    delete?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    connect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    update?: OperatorUpdateWithWhereUniqueWithoutPropertiInput | OperatorUpdateWithWhereUniqueWithoutPropertiInput[]
    updateMany?: OperatorUpdateManyWithWhereWithoutPropertiInput | OperatorUpdateManyWithWhereWithoutPropertiInput[]
    deleteMany?: OperatorScalarWhereInput | OperatorScalarWhereInput[]
  }

  export type PemesananUpdateManyWithoutPropertiNestedInput = {
    create?: XOR<PemesananCreateWithoutPropertiInput, PemesananUncheckedCreateWithoutPropertiInput> | PemesananCreateWithoutPropertiInput[] | PemesananUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutPropertiInput | PemesananCreateOrConnectWithoutPropertiInput[]
    upsert?: PemesananUpsertWithWhereUniqueWithoutPropertiInput | PemesananUpsertWithWhereUniqueWithoutPropertiInput[]
    createMany?: PemesananCreateManyPropertiInputEnvelope
    set?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    disconnect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    delete?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    update?: PemesananUpdateWithWhereUniqueWithoutPropertiInput | PemesananUpdateWithWhereUniqueWithoutPropertiInput[]
    updateMany?: PemesananUpdateManyWithWhereWithoutPropertiInput | PemesananUpdateManyWithWhereWithoutPropertiInput[]
    deleteMany?: PemesananScalarWhereInput | PemesananScalarWhereInput[]
  }

  export type PengajuanDanaUpdateManyWithoutPropertiNestedInput = {
    create?: XOR<PengajuanDanaCreateWithoutPropertiInput, PengajuanDanaUncheckedCreateWithoutPropertiInput> | PengajuanDanaCreateWithoutPropertiInput[] | PengajuanDanaUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: PengajuanDanaCreateOrConnectWithoutPropertiInput | PengajuanDanaCreateOrConnectWithoutPropertiInput[]
    upsert?: PengajuanDanaUpsertWithWhereUniqueWithoutPropertiInput | PengajuanDanaUpsertWithWhereUniqueWithoutPropertiInput[]
    createMany?: PengajuanDanaCreateManyPropertiInputEnvelope
    set?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    disconnect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    delete?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    connect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    update?: PengajuanDanaUpdateWithWhereUniqueWithoutPropertiInput | PengajuanDanaUpdateWithWhereUniqueWithoutPropertiInput[]
    updateMany?: PengajuanDanaUpdateManyWithWhereWithoutPropertiInput | PengajuanDanaUpdateManyWithWhereWithoutPropertiInput[]
    deleteMany?: PengajuanDanaScalarWhereInput | PengajuanDanaScalarWhereInput[]
  }

  export type KamarUncheckedUpdateManyWithoutPropertiNestedInput = {
    create?: XOR<KamarCreateWithoutPropertiInput, KamarUncheckedCreateWithoutPropertiInput> | KamarCreateWithoutPropertiInput[] | KamarUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: KamarCreateOrConnectWithoutPropertiInput | KamarCreateOrConnectWithoutPropertiInput[]
    upsert?: KamarUpsertWithWhereUniqueWithoutPropertiInput | KamarUpsertWithWhereUniqueWithoutPropertiInput[]
    createMany?: KamarCreateManyPropertiInputEnvelope
    set?: KamarWhereUniqueInput | KamarWhereUniqueInput[]
    disconnect?: KamarWhereUniqueInput | KamarWhereUniqueInput[]
    delete?: KamarWhereUniqueInput | KamarWhereUniqueInput[]
    connect?: KamarWhereUniqueInput | KamarWhereUniqueInput[]
    update?: KamarUpdateWithWhereUniqueWithoutPropertiInput | KamarUpdateWithWhereUniqueWithoutPropertiInput[]
    updateMany?: KamarUpdateManyWithWhereWithoutPropertiInput | KamarUpdateManyWithWhereWithoutPropertiInput[]
    deleteMany?: KamarScalarWhereInput | KamarScalarWhereInput[]
  }

  export type KomplainUncheckedUpdateManyWithoutPropertiNestedInput = {
    create?: XOR<KomplainCreateWithoutPropertiInput, KomplainUncheckedCreateWithoutPropertiInput> | KomplainCreateWithoutPropertiInput[] | KomplainUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: KomplainCreateOrConnectWithoutPropertiInput | KomplainCreateOrConnectWithoutPropertiInput[]
    upsert?: KomplainUpsertWithWhereUniqueWithoutPropertiInput | KomplainUpsertWithWhereUniqueWithoutPropertiInput[]
    createMany?: KomplainCreateManyPropertiInputEnvelope
    set?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    disconnect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    delete?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    connect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    update?: KomplainUpdateWithWhereUniqueWithoutPropertiInput | KomplainUpdateWithWhereUniqueWithoutPropertiInput[]
    updateMany?: KomplainUpdateManyWithWhereWithoutPropertiInput | KomplainUpdateManyWithWhereWithoutPropertiInput[]
    deleteMany?: KomplainScalarWhereInput | KomplainScalarWhereInput[]
  }

  export type OperatorUncheckedUpdateManyWithoutPropertiNestedInput = {
    create?: XOR<OperatorCreateWithoutPropertiInput, OperatorUncheckedCreateWithoutPropertiInput> | OperatorCreateWithoutPropertiInput[] | OperatorUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: OperatorCreateOrConnectWithoutPropertiInput | OperatorCreateOrConnectWithoutPropertiInput[]
    upsert?: OperatorUpsertWithWhereUniqueWithoutPropertiInput | OperatorUpsertWithWhereUniqueWithoutPropertiInput[]
    createMany?: OperatorCreateManyPropertiInputEnvelope
    set?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    disconnect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    delete?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    connect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    update?: OperatorUpdateWithWhereUniqueWithoutPropertiInput | OperatorUpdateWithWhereUniqueWithoutPropertiInput[]
    updateMany?: OperatorUpdateManyWithWhereWithoutPropertiInput | OperatorUpdateManyWithWhereWithoutPropertiInput[]
    deleteMany?: OperatorScalarWhereInput | OperatorScalarWhereInput[]
  }

  export type PemesananUncheckedUpdateManyWithoutPropertiNestedInput = {
    create?: XOR<PemesananCreateWithoutPropertiInput, PemesananUncheckedCreateWithoutPropertiInput> | PemesananCreateWithoutPropertiInput[] | PemesananUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutPropertiInput | PemesananCreateOrConnectWithoutPropertiInput[]
    upsert?: PemesananUpsertWithWhereUniqueWithoutPropertiInput | PemesananUpsertWithWhereUniqueWithoutPropertiInput[]
    createMany?: PemesananCreateManyPropertiInputEnvelope
    set?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    disconnect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    delete?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    update?: PemesananUpdateWithWhereUniqueWithoutPropertiInput | PemesananUpdateWithWhereUniqueWithoutPropertiInput[]
    updateMany?: PemesananUpdateManyWithWhereWithoutPropertiInput | PemesananUpdateManyWithWhereWithoutPropertiInput[]
    deleteMany?: PemesananScalarWhereInput | PemesananScalarWhereInput[]
  }

  export type PengajuanDanaUncheckedUpdateManyWithoutPropertiNestedInput = {
    create?: XOR<PengajuanDanaCreateWithoutPropertiInput, PengajuanDanaUncheckedCreateWithoutPropertiInput> | PengajuanDanaCreateWithoutPropertiInput[] | PengajuanDanaUncheckedCreateWithoutPropertiInput[]
    connectOrCreate?: PengajuanDanaCreateOrConnectWithoutPropertiInput | PengajuanDanaCreateOrConnectWithoutPropertiInput[]
    upsert?: PengajuanDanaUpsertWithWhereUniqueWithoutPropertiInput | PengajuanDanaUpsertWithWhereUniqueWithoutPropertiInput[]
    createMany?: PengajuanDanaCreateManyPropertiInputEnvelope
    set?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    disconnect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    delete?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    connect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    update?: PengajuanDanaUpdateWithWhereUniqueWithoutPropertiInput | PengajuanDanaUpdateWithWhereUniqueWithoutPropertiInput[]
    updateMany?: PengajuanDanaUpdateManyWithWhereWithoutPropertiInput | PengajuanDanaUpdateManyWithWhereWithoutPropertiInput[]
    deleteMany?: PengajuanDanaScalarWhereInput | PengajuanDanaScalarWhereInput[]
  }

  export type KamarCreatefasilitasInput = {
    set: string[]
  }

  export type KamarCreategambarInput = {
    set: string[]
  }

  export type PropertiCreateNestedOneWithoutKamarInput = {
    create?: XOR<PropertiCreateWithoutKamarInput, PropertiUncheckedCreateWithoutKamarInput>
    connectOrCreate?: PropertiCreateOrConnectWithoutKamarInput
    connect?: PropertiWhereUniqueInput
  }

  export type PemesananCreateNestedManyWithoutKamarInput = {
    create?: XOR<PemesananCreateWithoutKamarInput, PemesananUncheckedCreateWithoutKamarInput> | PemesananCreateWithoutKamarInput[] | PemesananUncheckedCreateWithoutKamarInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutKamarInput | PemesananCreateOrConnectWithoutKamarInput[]
    createMany?: PemesananCreateManyKamarInputEnvelope
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
  }

  export type PenghuniCreateNestedOneWithoutKamarInput = {
    create?: XOR<PenghuniCreateWithoutKamarInput, PenghuniUncheckedCreateWithoutKamarInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutKamarInput
    connect?: PenghuniWhereUniqueInput
  }

  export type PemesananUncheckedCreateNestedManyWithoutKamarInput = {
    create?: XOR<PemesananCreateWithoutKamarInput, PemesananUncheckedCreateWithoutKamarInput> | PemesananCreateWithoutKamarInput[] | PemesananUncheckedCreateWithoutKamarInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutKamarInput | PemesananCreateOrConnectWithoutKamarInput[]
    createMany?: PemesananCreateManyKamarInputEnvelope
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
  }

  export type PenghuniUncheckedCreateNestedOneWithoutKamarInput = {
    create?: XOR<PenghuniCreateWithoutKamarInput, PenghuniUncheckedCreateWithoutKamarInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutKamarInput
    connect?: PenghuniWhereUniqueInput
  }

  export type EnumTipeKamarFieldUpdateOperationsInput = {
    set?: $Enums.TipeKamar
  }

  export type KamarUpdatefasilitasInput = {
    set?: string[]
    push?: string | string[]
  }

  export type KamarUpdategambarInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumStatusKamarFieldUpdateOperationsInput = {
    set?: $Enums.StatusKamar
  }

  export type PropertiUpdateOneRequiredWithoutKamarNestedInput = {
    create?: XOR<PropertiCreateWithoutKamarInput, PropertiUncheckedCreateWithoutKamarInput>
    connectOrCreate?: PropertiCreateOrConnectWithoutKamarInput
    upsert?: PropertiUpsertWithoutKamarInput
    connect?: PropertiWhereUniqueInput
    update?: XOR<XOR<PropertiUpdateToOneWithWhereWithoutKamarInput, PropertiUpdateWithoutKamarInput>, PropertiUncheckedUpdateWithoutKamarInput>
  }

  export type PemesananUpdateManyWithoutKamarNestedInput = {
    create?: XOR<PemesananCreateWithoutKamarInput, PemesananUncheckedCreateWithoutKamarInput> | PemesananCreateWithoutKamarInput[] | PemesananUncheckedCreateWithoutKamarInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutKamarInput | PemesananCreateOrConnectWithoutKamarInput[]
    upsert?: PemesananUpsertWithWhereUniqueWithoutKamarInput | PemesananUpsertWithWhereUniqueWithoutKamarInput[]
    createMany?: PemesananCreateManyKamarInputEnvelope
    set?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    disconnect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    delete?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    update?: PemesananUpdateWithWhereUniqueWithoutKamarInput | PemesananUpdateWithWhereUniqueWithoutKamarInput[]
    updateMany?: PemesananUpdateManyWithWhereWithoutKamarInput | PemesananUpdateManyWithWhereWithoutKamarInput[]
    deleteMany?: PemesananScalarWhereInput | PemesananScalarWhereInput[]
  }

  export type PenghuniUpdateOneWithoutKamarNestedInput = {
    create?: XOR<PenghuniCreateWithoutKamarInput, PenghuniUncheckedCreateWithoutKamarInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutKamarInput
    upsert?: PenghuniUpsertWithoutKamarInput
    disconnect?: PenghuniWhereInput | boolean
    delete?: PenghuniWhereInput | boolean
    connect?: PenghuniWhereUniqueInput
    update?: XOR<XOR<PenghuniUpdateToOneWithWhereWithoutKamarInput, PenghuniUpdateWithoutKamarInput>, PenghuniUncheckedUpdateWithoutKamarInput>
  }

  export type PemesananUncheckedUpdateManyWithoutKamarNestedInput = {
    create?: XOR<PemesananCreateWithoutKamarInput, PemesananUncheckedCreateWithoutKamarInput> | PemesananCreateWithoutKamarInput[] | PemesananUncheckedCreateWithoutKamarInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutKamarInput | PemesananCreateOrConnectWithoutKamarInput[]
    upsert?: PemesananUpsertWithWhereUniqueWithoutKamarInput | PemesananUpsertWithWhereUniqueWithoutKamarInput[]
    createMany?: PemesananCreateManyKamarInputEnvelope
    set?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    disconnect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    delete?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    update?: PemesananUpdateWithWhereUniqueWithoutKamarInput | PemesananUpdateWithWhereUniqueWithoutKamarInput[]
    updateMany?: PemesananUpdateManyWithWhereWithoutKamarInput | PemesananUpdateManyWithWhereWithoutKamarInput[]
    deleteMany?: PemesananScalarWhereInput | PemesananScalarWhereInput[]
  }

  export type PenghuniUncheckedUpdateOneWithoutKamarNestedInput = {
    create?: XOR<PenghuniCreateWithoutKamarInput, PenghuniUncheckedCreateWithoutKamarInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutKamarInput
    upsert?: PenghuniUpsertWithoutKamarInput
    disconnect?: PenghuniWhereInput | boolean
    delete?: PenghuniWhereInput | boolean
    connect?: PenghuniWhereUniqueInput
    update?: XOR<XOR<PenghuniUpdateToOneWithWhereWithoutKamarInput, PenghuniUpdateWithoutKamarInput>, PenghuniUncheckedUpdateWithoutKamarInput>
  }

  export type KamarCreateNestedOneWithoutPemesananInput = {
    create?: XOR<KamarCreateWithoutPemesananInput, KamarUncheckedCreateWithoutPemesananInput>
    connectOrCreate?: KamarCreateOrConnectWithoutPemesananInput
    connect?: KamarWhereUniqueInput
  }

  export type PenghuniCreateNestedOneWithoutPemesananInput = {
    create?: XOR<PenghuniCreateWithoutPemesananInput, PenghuniUncheckedCreateWithoutPemesananInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutPemesananInput
    connect?: PenghuniWhereUniqueInput
  }

  export type PropertiCreateNestedOneWithoutPemesananInput = {
    create?: XOR<PropertiCreateWithoutPemesananInput, PropertiUncheckedCreateWithoutPemesananInput>
    connectOrCreate?: PropertiCreateOrConnectWithoutPemesananInput
    connect?: PropertiWhereUniqueInput
  }

  export type PembayaranCreateNestedOneWithoutPemesananInput = {
    create?: XOR<PembayaranCreateWithoutPemesananInput, PembayaranUncheckedCreateWithoutPemesananInput>
    connectOrCreate?: PembayaranCreateOrConnectWithoutPemesananInput
    connect?: PembayaranWhereUniqueInput
  }

  export type PembayaranUncheckedCreateNestedOneWithoutPemesananInput = {
    create?: XOR<PembayaranCreateWithoutPemesananInput, PembayaranUncheckedCreateWithoutPemesananInput>
    connectOrCreate?: PembayaranCreateOrConnectWithoutPemesananInput
    connect?: PembayaranWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStatusPemesananFieldUpdateOperationsInput = {
    set?: $Enums.StatusPemesanan
  }

  export type KamarUpdateOneRequiredWithoutPemesananNestedInput = {
    create?: XOR<KamarCreateWithoutPemesananInput, KamarUncheckedCreateWithoutPemesananInput>
    connectOrCreate?: KamarCreateOrConnectWithoutPemesananInput
    upsert?: KamarUpsertWithoutPemesananInput
    connect?: KamarWhereUniqueInput
    update?: XOR<XOR<KamarUpdateToOneWithWhereWithoutPemesananInput, KamarUpdateWithoutPemesananInput>, KamarUncheckedUpdateWithoutPemesananInput>
  }

  export type PenghuniUpdateOneRequiredWithoutPemesananNestedInput = {
    create?: XOR<PenghuniCreateWithoutPemesananInput, PenghuniUncheckedCreateWithoutPemesananInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutPemesananInput
    upsert?: PenghuniUpsertWithoutPemesananInput
    connect?: PenghuniWhereUniqueInput
    update?: XOR<XOR<PenghuniUpdateToOneWithWhereWithoutPemesananInput, PenghuniUpdateWithoutPemesananInput>, PenghuniUncheckedUpdateWithoutPemesananInput>
  }

  export type PropertiUpdateOneRequiredWithoutPemesananNestedInput = {
    create?: XOR<PropertiCreateWithoutPemesananInput, PropertiUncheckedCreateWithoutPemesananInput>
    connectOrCreate?: PropertiCreateOrConnectWithoutPemesananInput
    upsert?: PropertiUpsertWithoutPemesananInput
    connect?: PropertiWhereUniqueInput
    update?: XOR<XOR<PropertiUpdateToOneWithWhereWithoutPemesananInput, PropertiUpdateWithoutPemesananInput>, PropertiUncheckedUpdateWithoutPemesananInput>
  }

  export type PembayaranUpdateOneWithoutPemesananNestedInput = {
    create?: XOR<PembayaranCreateWithoutPemesananInput, PembayaranUncheckedCreateWithoutPemesananInput>
    connectOrCreate?: PembayaranCreateOrConnectWithoutPemesananInput
    upsert?: PembayaranUpsertWithoutPemesananInput
    disconnect?: PembayaranWhereInput | boolean
    delete?: PembayaranWhereInput | boolean
    connect?: PembayaranWhereUniqueInput
    update?: XOR<XOR<PembayaranUpdateToOneWithWhereWithoutPemesananInput, PembayaranUpdateWithoutPemesananInput>, PembayaranUncheckedUpdateWithoutPemesananInput>
  }

  export type PembayaranUncheckedUpdateOneWithoutPemesananNestedInput = {
    create?: XOR<PembayaranCreateWithoutPemesananInput, PembayaranUncheckedCreateWithoutPemesananInput>
    connectOrCreate?: PembayaranCreateOrConnectWithoutPemesananInput
    upsert?: PembayaranUpsertWithoutPemesananInput
    disconnect?: PembayaranWhereInput | boolean
    delete?: PembayaranWhereInput | boolean
    connect?: PembayaranWhereUniqueInput
    update?: XOR<XOR<PembayaranUpdateToOneWithWhereWithoutPemesananInput, PembayaranUpdateWithoutPemesananInput>, PembayaranUncheckedUpdateWithoutPemesananInput>
  }

  export type PemesananCreateNestedOneWithoutPembayaranInput = {
    create?: XOR<PemesananCreateWithoutPembayaranInput, PemesananUncheckedCreateWithoutPembayaranInput>
    connectOrCreate?: PemesananCreateOrConnectWithoutPembayaranInput
    connect?: PemesananWhereUniqueInput
  }

  export type EnumStatusPembayaranFieldUpdateOperationsInput = {
    set?: $Enums.StatusPembayaran
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PemesananUpdateOneRequiredWithoutPembayaranNestedInput = {
    create?: XOR<PemesananCreateWithoutPembayaranInput, PemesananUncheckedCreateWithoutPembayaranInput>
    connectOrCreate?: PemesananCreateOrConnectWithoutPembayaranInput
    upsert?: PemesananUpsertWithoutPembayaranInput
    connect?: PemesananWhereUniqueInput
    update?: XOR<XOR<PemesananUpdateToOneWithWhereWithoutPembayaranInput, PemesananUpdateWithoutPembayaranInput>, PemesananUncheckedUpdateWithoutPembayaranInput>
  }

  export type UserCreateNestedOneWithoutPenghuniInput = {
    create?: XOR<UserCreateWithoutPenghuniInput, UserUncheckedCreateWithoutPenghuniInput>
    connectOrCreate?: UserCreateOrConnectWithoutPenghuniInput
    connect?: UserWhereUniqueInput
  }

  export type KamarCreateNestedOneWithoutPenghuniInput = {
    create?: XOR<KamarCreateWithoutPenghuniInput, KamarUncheckedCreateWithoutPenghuniInput>
    connectOrCreate?: KamarCreateOrConnectWithoutPenghuniInput
    connect?: KamarWhereUniqueInput
  }

  export type PemesananCreateNestedManyWithoutPenghuniInput = {
    create?: XOR<PemesananCreateWithoutPenghuniInput, PemesananUncheckedCreateWithoutPenghuniInput> | PemesananCreateWithoutPenghuniInput[] | PemesananUncheckedCreateWithoutPenghuniInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutPenghuniInput | PemesananCreateOrConnectWithoutPenghuniInput[]
    createMany?: PemesananCreateManyPenghuniInputEnvelope
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
  }

  export type KomplainCreateNestedManyWithoutPenghuniInput = {
    create?: XOR<KomplainCreateWithoutPenghuniInput, KomplainUncheckedCreateWithoutPenghuniInput> | KomplainCreateWithoutPenghuniInput[] | KomplainUncheckedCreateWithoutPenghuniInput[]
    connectOrCreate?: KomplainCreateOrConnectWithoutPenghuniInput | KomplainCreateOrConnectWithoutPenghuniInput[]
    createMany?: KomplainCreateManyPenghuniInputEnvelope
    connect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
  }

  export type PemesananUncheckedCreateNestedManyWithoutPenghuniInput = {
    create?: XOR<PemesananCreateWithoutPenghuniInput, PemesananUncheckedCreateWithoutPenghuniInput> | PemesananCreateWithoutPenghuniInput[] | PemesananUncheckedCreateWithoutPenghuniInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutPenghuniInput | PemesananCreateOrConnectWithoutPenghuniInput[]
    createMany?: PemesananCreateManyPenghuniInputEnvelope
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
  }

  export type KomplainUncheckedCreateNestedManyWithoutPenghuniInput = {
    create?: XOR<KomplainCreateWithoutPenghuniInput, KomplainUncheckedCreateWithoutPenghuniInput> | KomplainCreateWithoutPenghuniInput[] | KomplainUncheckedCreateWithoutPenghuniInput[]
    connectOrCreate?: KomplainCreateOrConnectWithoutPenghuniInput | KomplainCreateOrConnectWithoutPenghuniInput[]
    createMany?: KomplainCreateManyPenghuniInputEnvelope
    connect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
  }

  export type EnumStatusSewaFieldUpdateOperationsInput = {
    set?: $Enums.StatusSewa
  }

  export type UserUpdateOneRequiredWithoutPenghuniNestedInput = {
    create?: XOR<UserCreateWithoutPenghuniInput, UserUncheckedCreateWithoutPenghuniInput>
    connectOrCreate?: UserCreateOrConnectWithoutPenghuniInput
    upsert?: UserUpsertWithoutPenghuniInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPenghuniInput, UserUpdateWithoutPenghuniInput>, UserUncheckedUpdateWithoutPenghuniInput>
  }

  export type KamarUpdateOneWithoutPenghuniNestedInput = {
    create?: XOR<KamarCreateWithoutPenghuniInput, KamarUncheckedCreateWithoutPenghuniInput>
    connectOrCreate?: KamarCreateOrConnectWithoutPenghuniInput
    upsert?: KamarUpsertWithoutPenghuniInput
    disconnect?: KamarWhereInput | boolean
    delete?: KamarWhereInput | boolean
    connect?: KamarWhereUniqueInput
    update?: XOR<XOR<KamarUpdateToOneWithWhereWithoutPenghuniInput, KamarUpdateWithoutPenghuniInput>, KamarUncheckedUpdateWithoutPenghuniInput>
  }

  export type PemesananUpdateManyWithoutPenghuniNestedInput = {
    create?: XOR<PemesananCreateWithoutPenghuniInput, PemesananUncheckedCreateWithoutPenghuniInput> | PemesananCreateWithoutPenghuniInput[] | PemesananUncheckedCreateWithoutPenghuniInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutPenghuniInput | PemesananCreateOrConnectWithoutPenghuniInput[]
    upsert?: PemesananUpsertWithWhereUniqueWithoutPenghuniInput | PemesananUpsertWithWhereUniqueWithoutPenghuniInput[]
    createMany?: PemesananCreateManyPenghuniInputEnvelope
    set?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    disconnect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    delete?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    update?: PemesananUpdateWithWhereUniqueWithoutPenghuniInput | PemesananUpdateWithWhereUniqueWithoutPenghuniInput[]
    updateMany?: PemesananUpdateManyWithWhereWithoutPenghuniInput | PemesananUpdateManyWithWhereWithoutPenghuniInput[]
    deleteMany?: PemesananScalarWhereInput | PemesananScalarWhereInput[]
  }

  export type KomplainUpdateManyWithoutPenghuniNestedInput = {
    create?: XOR<KomplainCreateWithoutPenghuniInput, KomplainUncheckedCreateWithoutPenghuniInput> | KomplainCreateWithoutPenghuniInput[] | KomplainUncheckedCreateWithoutPenghuniInput[]
    connectOrCreate?: KomplainCreateOrConnectWithoutPenghuniInput | KomplainCreateOrConnectWithoutPenghuniInput[]
    upsert?: KomplainUpsertWithWhereUniqueWithoutPenghuniInput | KomplainUpsertWithWhereUniqueWithoutPenghuniInput[]
    createMany?: KomplainCreateManyPenghuniInputEnvelope
    set?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    disconnect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    delete?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    connect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    update?: KomplainUpdateWithWhereUniqueWithoutPenghuniInput | KomplainUpdateWithWhereUniqueWithoutPenghuniInput[]
    updateMany?: KomplainUpdateManyWithWhereWithoutPenghuniInput | KomplainUpdateManyWithWhereWithoutPenghuniInput[]
    deleteMany?: KomplainScalarWhereInput | KomplainScalarWhereInput[]
  }

  export type PemesananUncheckedUpdateManyWithoutPenghuniNestedInput = {
    create?: XOR<PemesananCreateWithoutPenghuniInput, PemesananUncheckedCreateWithoutPenghuniInput> | PemesananCreateWithoutPenghuniInput[] | PemesananUncheckedCreateWithoutPenghuniInput[]
    connectOrCreate?: PemesananCreateOrConnectWithoutPenghuniInput | PemesananCreateOrConnectWithoutPenghuniInput[]
    upsert?: PemesananUpsertWithWhereUniqueWithoutPenghuniInput | PemesananUpsertWithWhereUniqueWithoutPenghuniInput[]
    createMany?: PemesananCreateManyPenghuniInputEnvelope
    set?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    disconnect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    delete?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    connect?: PemesananWhereUniqueInput | PemesananWhereUniqueInput[]
    update?: PemesananUpdateWithWhereUniqueWithoutPenghuniInput | PemesananUpdateWithWhereUniqueWithoutPenghuniInput[]
    updateMany?: PemesananUpdateManyWithWhereWithoutPenghuniInput | PemesananUpdateManyWithWhereWithoutPenghuniInput[]
    deleteMany?: PemesananScalarWhereInput | PemesananScalarWhereInput[]
  }

  export type KomplainUncheckedUpdateManyWithoutPenghuniNestedInput = {
    create?: XOR<KomplainCreateWithoutPenghuniInput, KomplainUncheckedCreateWithoutPenghuniInput> | KomplainCreateWithoutPenghuniInput[] | KomplainUncheckedCreateWithoutPenghuniInput[]
    connectOrCreate?: KomplainCreateOrConnectWithoutPenghuniInput | KomplainCreateOrConnectWithoutPenghuniInput[]
    upsert?: KomplainUpsertWithWhereUniqueWithoutPenghuniInput | KomplainUpsertWithWhereUniqueWithoutPenghuniInput[]
    createMany?: KomplainCreateManyPenghuniInputEnvelope
    set?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    disconnect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    delete?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    connect?: KomplainWhereUniqueInput | KomplainWhereUniqueInput[]
    update?: KomplainUpdateWithWhereUniqueWithoutPenghuniInput | KomplainUpdateWithWhereUniqueWithoutPenghuniInput[]
    updateMany?: KomplainUpdateManyWithWhereWithoutPenghuniInput | KomplainUpdateManyWithWhereWithoutPenghuniInput[]
    deleteMany?: KomplainScalarWhereInput | KomplainScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOperatorInput = {
    create?: XOR<UserCreateWithoutOperatorInput, UserUncheckedCreateWithoutOperatorInput>
    connectOrCreate?: UserCreateOrConnectWithoutOperatorInput
    connect?: UserWhereUniqueInput
  }

  export type PropertiCreateNestedOneWithoutOperatorInput = {
    create?: XOR<PropertiCreateWithoutOperatorInput, PropertiUncheckedCreateWithoutOperatorInput>
    connectOrCreate?: PropertiCreateOrConnectWithoutOperatorInput
    connect?: PropertiWhereUniqueInput
  }

  export type PengajuanDanaCreateNestedManyWithoutOperatorInput = {
    create?: XOR<PengajuanDanaCreateWithoutOperatorInput, PengajuanDanaUncheckedCreateWithoutOperatorInput> | PengajuanDanaCreateWithoutOperatorInput[] | PengajuanDanaUncheckedCreateWithoutOperatorInput[]
    connectOrCreate?: PengajuanDanaCreateOrConnectWithoutOperatorInput | PengajuanDanaCreateOrConnectWithoutOperatorInput[]
    createMany?: PengajuanDanaCreateManyOperatorInputEnvelope
    connect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
  }

  export type PengajuanDanaUncheckedCreateNestedManyWithoutOperatorInput = {
    create?: XOR<PengajuanDanaCreateWithoutOperatorInput, PengajuanDanaUncheckedCreateWithoutOperatorInput> | PengajuanDanaCreateWithoutOperatorInput[] | PengajuanDanaUncheckedCreateWithoutOperatorInput[]
    connectOrCreate?: PengajuanDanaCreateOrConnectWithoutOperatorInput | PengajuanDanaCreateOrConnectWithoutOperatorInput[]
    createMany?: PengajuanDanaCreateManyOperatorInputEnvelope
    connect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOperatorNestedInput = {
    create?: XOR<UserCreateWithoutOperatorInput, UserUncheckedCreateWithoutOperatorInput>
    connectOrCreate?: UserCreateOrConnectWithoutOperatorInput
    upsert?: UserUpsertWithoutOperatorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOperatorInput, UserUpdateWithoutOperatorInput>, UserUncheckedUpdateWithoutOperatorInput>
  }

  export type PropertiUpdateOneRequiredWithoutOperatorNestedInput = {
    create?: XOR<PropertiCreateWithoutOperatorInput, PropertiUncheckedCreateWithoutOperatorInput>
    connectOrCreate?: PropertiCreateOrConnectWithoutOperatorInput
    upsert?: PropertiUpsertWithoutOperatorInput
    connect?: PropertiWhereUniqueInput
    update?: XOR<XOR<PropertiUpdateToOneWithWhereWithoutOperatorInput, PropertiUpdateWithoutOperatorInput>, PropertiUncheckedUpdateWithoutOperatorInput>
  }

  export type PengajuanDanaUpdateManyWithoutOperatorNestedInput = {
    create?: XOR<PengajuanDanaCreateWithoutOperatorInput, PengajuanDanaUncheckedCreateWithoutOperatorInput> | PengajuanDanaCreateWithoutOperatorInput[] | PengajuanDanaUncheckedCreateWithoutOperatorInput[]
    connectOrCreate?: PengajuanDanaCreateOrConnectWithoutOperatorInput | PengajuanDanaCreateOrConnectWithoutOperatorInput[]
    upsert?: PengajuanDanaUpsertWithWhereUniqueWithoutOperatorInput | PengajuanDanaUpsertWithWhereUniqueWithoutOperatorInput[]
    createMany?: PengajuanDanaCreateManyOperatorInputEnvelope
    set?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    disconnect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    delete?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    connect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    update?: PengajuanDanaUpdateWithWhereUniqueWithoutOperatorInput | PengajuanDanaUpdateWithWhereUniqueWithoutOperatorInput[]
    updateMany?: PengajuanDanaUpdateManyWithWhereWithoutOperatorInput | PengajuanDanaUpdateManyWithWhereWithoutOperatorInput[]
    deleteMany?: PengajuanDanaScalarWhereInput | PengajuanDanaScalarWhereInput[]
  }

  export type PengajuanDanaUncheckedUpdateManyWithoutOperatorNestedInput = {
    create?: XOR<PengajuanDanaCreateWithoutOperatorInput, PengajuanDanaUncheckedCreateWithoutOperatorInput> | PengajuanDanaCreateWithoutOperatorInput[] | PengajuanDanaUncheckedCreateWithoutOperatorInput[]
    connectOrCreate?: PengajuanDanaCreateOrConnectWithoutOperatorInput | PengajuanDanaCreateOrConnectWithoutOperatorInput[]
    upsert?: PengajuanDanaUpsertWithWhereUniqueWithoutOperatorInput | PengajuanDanaUpsertWithWhereUniqueWithoutOperatorInput[]
    createMany?: PengajuanDanaCreateManyOperatorInputEnvelope
    set?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    disconnect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    delete?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    connect?: PengajuanDanaWhereUniqueInput | PengajuanDanaWhereUniqueInput[]
    update?: PengajuanDanaUpdateWithWhereUniqueWithoutOperatorInput | PengajuanDanaUpdateWithWhereUniqueWithoutOperatorInput[]
    updateMany?: PengajuanDanaUpdateManyWithWhereWithoutOperatorInput | PengajuanDanaUpdateManyWithWhereWithoutOperatorInput[]
    deleteMany?: PengajuanDanaScalarWhereInput | PengajuanDanaScalarWhereInput[]
  }

  export type PenghuniCreateNestedOneWithoutKomplainInput = {
    create?: XOR<PenghuniCreateWithoutKomplainInput, PenghuniUncheckedCreateWithoutKomplainInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutKomplainInput
    connect?: PenghuniWhereUniqueInput
  }

  export type PropertiCreateNestedOneWithoutKomplainInput = {
    create?: XOR<PropertiCreateWithoutKomplainInput, PropertiUncheckedCreateWithoutKomplainInput>
    connectOrCreate?: PropertiCreateOrConnectWithoutKomplainInput
    connect?: PropertiWhereUniqueInput
  }

  export type EnumJenisKomplainFieldUpdateOperationsInput = {
    set?: $Enums.JenisKomplain
  }

  export type EnumStatusKomplainFieldUpdateOperationsInput = {
    set?: $Enums.StatusKomplain
  }

  export type PenghuniUpdateOneRequiredWithoutKomplainNestedInput = {
    create?: XOR<PenghuniCreateWithoutKomplainInput, PenghuniUncheckedCreateWithoutKomplainInput>
    connectOrCreate?: PenghuniCreateOrConnectWithoutKomplainInput
    upsert?: PenghuniUpsertWithoutKomplainInput
    connect?: PenghuniWhereUniqueInput
    update?: XOR<XOR<PenghuniUpdateToOneWithWhereWithoutKomplainInput, PenghuniUpdateWithoutKomplainInput>, PenghuniUncheckedUpdateWithoutKomplainInput>
  }

  export type PropertiUpdateOneRequiredWithoutKomplainNestedInput = {
    create?: XOR<PropertiCreateWithoutKomplainInput, PropertiUncheckedCreateWithoutKomplainInput>
    connectOrCreate?: PropertiCreateOrConnectWithoutKomplainInput
    upsert?: PropertiUpsertWithoutKomplainInput
    connect?: PropertiWhereUniqueInput
    update?: XOR<XOR<PropertiUpdateToOneWithWhereWithoutKomplainInput, PropertiUpdateWithoutKomplainInput>, PropertiUncheckedUpdateWithoutKomplainInput>
  }

  export type OperatorCreateNestedOneWithoutPengajuanDanaInput = {
    create?: XOR<OperatorCreateWithoutPengajuanDanaInput, OperatorUncheckedCreateWithoutPengajuanDanaInput>
    connectOrCreate?: OperatorCreateOrConnectWithoutPengajuanDanaInput
    connect?: OperatorWhereUniqueInput
  }

  export type PropertiCreateNestedOneWithoutPengajuanDanaInput = {
    create?: XOR<PropertiCreateWithoutPengajuanDanaInput, PropertiUncheckedCreateWithoutPengajuanDanaInput>
    connectOrCreate?: PropertiCreateOrConnectWithoutPengajuanDanaInput
    connect?: PropertiWhereUniqueInput
  }

  export type EnumStatusDanaFieldUpdateOperationsInput = {
    set?: $Enums.StatusDana
  }

  export type OperatorUpdateOneRequiredWithoutPengajuanDanaNestedInput = {
    create?: XOR<OperatorCreateWithoutPengajuanDanaInput, OperatorUncheckedCreateWithoutPengajuanDanaInput>
    connectOrCreate?: OperatorCreateOrConnectWithoutPengajuanDanaInput
    upsert?: OperatorUpsertWithoutPengajuanDanaInput
    connect?: OperatorWhereUniqueInput
    update?: XOR<XOR<OperatorUpdateToOneWithWhereWithoutPengajuanDanaInput, OperatorUpdateWithoutPengajuanDanaInput>, OperatorUncheckedUpdateWithoutPengajuanDanaInput>
  }

  export type PropertiUpdateOneRequiredWithoutPengajuanDanaNestedInput = {
    create?: XOR<PropertiCreateWithoutPengajuanDanaInput, PropertiUncheckedCreateWithoutPengajuanDanaInput>
    connectOrCreate?: PropertiCreateOrConnectWithoutPengajuanDanaInput
    upsert?: PropertiUpsertWithoutPengajuanDanaInput
    connect?: PropertiWhereUniqueInput
    update?: XOR<XOR<PropertiUpdateToOneWithWhereWithoutPengajuanDanaInput, PropertiUpdateWithoutPengajuanDanaInput>, PropertiUncheckedUpdateWithoutPengajuanDanaInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumJenisPropertiNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisProperti | EnumJenisPropertiFieldRefInput<$PrismaModel> | null
    in?: $Enums.JenisProperti[] | ListEnumJenisPropertiFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JenisProperti[] | ListEnumJenisPropertiFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJenisPropertiNullableFilter<$PrismaModel> | $Enums.JenisProperti | null
  }

  export type NestedEnumJenisPropertiNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisProperti | EnumJenisPropertiFieldRefInput<$PrismaModel> | null
    in?: $Enums.JenisProperti[] | ListEnumJenisPropertiFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JenisProperti[] | ListEnumJenisPropertiFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJenisPropertiNullableWithAggregatesFilter<$PrismaModel> | $Enums.JenisProperti | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumJenisPropertiNullableFilter<$PrismaModel>
    _max?: NestedEnumJenisPropertiNullableFilter<$PrismaModel>
  }

  export type NestedEnumTipeKamarFilter<$PrismaModel = never> = {
    equals?: $Enums.TipeKamar | EnumTipeKamarFieldRefInput<$PrismaModel>
    in?: $Enums.TipeKamar[] | ListEnumTipeKamarFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipeKamar[] | ListEnumTipeKamarFieldRefInput<$PrismaModel>
    not?: NestedEnumTipeKamarFilter<$PrismaModel> | $Enums.TipeKamar
  }

  export type NestedEnumStatusKamarFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKamar | EnumStatusKamarFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKamar[] | ListEnumStatusKamarFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKamar[] | ListEnumStatusKamarFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKamarFilter<$PrismaModel> | $Enums.StatusKamar
  }

  export type NestedEnumTipeKamarWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipeKamar | EnumTipeKamarFieldRefInput<$PrismaModel>
    in?: $Enums.TipeKamar[] | ListEnumTipeKamarFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipeKamar[] | ListEnumTipeKamarFieldRefInput<$PrismaModel>
    not?: NestedEnumTipeKamarWithAggregatesFilter<$PrismaModel> | $Enums.TipeKamar
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipeKamarFilter<$PrismaModel>
    _max?: NestedEnumTipeKamarFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumStatusKamarWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKamar | EnumStatusKamarFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKamar[] | ListEnumStatusKamarFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKamar[] | ListEnumStatusKamarFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKamarWithAggregatesFilter<$PrismaModel> | $Enums.StatusKamar
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKamarFilter<$PrismaModel>
    _max?: NestedEnumStatusKamarFilter<$PrismaModel>
  }

  export type NestedEnumStatusPemesananFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPemesanan | EnumStatusPemesananFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPemesanan[] | ListEnumStatusPemesananFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPemesanan[] | ListEnumStatusPemesananFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPemesananFilter<$PrismaModel> | $Enums.StatusPemesanan
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStatusPemesananWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPemesanan | EnumStatusPemesananFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPemesanan[] | ListEnumStatusPemesananFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPemesanan[] | ListEnumStatusPemesananFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPemesananWithAggregatesFilter<$PrismaModel> | $Enums.StatusPemesanan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusPemesananFilter<$PrismaModel>
    _max?: NestedEnumStatusPemesananFilter<$PrismaModel>
  }

  export type NestedEnumStatusPembayaranFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPembayaran | EnumStatusPembayaranFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPembayaran[] | ListEnumStatusPembayaranFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPembayaran[] | ListEnumStatusPembayaranFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPembayaranFilter<$PrismaModel> | $Enums.StatusPembayaran
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumStatusPembayaranWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusPembayaran | EnumStatusPembayaranFieldRefInput<$PrismaModel>
    in?: $Enums.StatusPembayaran[] | ListEnumStatusPembayaranFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusPembayaran[] | ListEnumStatusPembayaranFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusPembayaranWithAggregatesFilter<$PrismaModel> | $Enums.StatusPembayaran
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusPembayaranFilter<$PrismaModel>
    _max?: NestedEnumStatusPembayaranFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusSewaFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusSewa | EnumStatusSewaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusSewa[] | ListEnumStatusSewaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusSewa[] | ListEnumStatusSewaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusSewaFilter<$PrismaModel> | $Enums.StatusSewa
  }

  export type NestedEnumStatusSewaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusSewa | EnumStatusSewaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusSewa[] | ListEnumStatusSewaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusSewa[] | ListEnumStatusSewaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusSewaWithAggregatesFilter<$PrismaModel> | $Enums.StatusSewa
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusSewaFilter<$PrismaModel>
    _max?: NestedEnumStatusSewaFilter<$PrismaModel>
  }

  export type NestedEnumJenisKomplainFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisKomplain | EnumJenisKomplainFieldRefInput<$PrismaModel>
    in?: $Enums.JenisKomplain[] | ListEnumJenisKomplainFieldRefInput<$PrismaModel>
    notIn?: $Enums.JenisKomplain[] | ListEnumJenisKomplainFieldRefInput<$PrismaModel>
    not?: NestedEnumJenisKomplainFilter<$PrismaModel> | $Enums.JenisKomplain
  }

  export type NestedEnumStatusKomplainFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKomplain | EnumStatusKomplainFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKomplain[] | ListEnumStatusKomplainFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKomplain[] | ListEnumStatusKomplainFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKomplainFilter<$PrismaModel> | $Enums.StatusKomplain
  }

  export type NestedEnumJenisKomplainWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisKomplain | EnumJenisKomplainFieldRefInput<$PrismaModel>
    in?: $Enums.JenisKomplain[] | ListEnumJenisKomplainFieldRefInput<$PrismaModel>
    notIn?: $Enums.JenisKomplain[] | ListEnumJenisKomplainFieldRefInput<$PrismaModel>
    not?: NestedEnumJenisKomplainWithAggregatesFilter<$PrismaModel> | $Enums.JenisKomplain
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJenisKomplainFilter<$PrismaModel>
    _max?: NestedEnumJenisKomplainFilter<$PrismaModel>
  }

  export type NestedEnumStatusKomplainWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKomplain | EnumStatusKomplainFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKomplain[] | ListEnumStatusKomplainFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKomplain[] | ListEnumStatusKomplainFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKomplainWithAggregatesFilter<$PrismaModel> | $Enums.StatusKomplain
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKomplainFilter<$PrismaModel>
    _max?: NestedEnumStatusKomplainFilter<$PrismaModel>
  }

  export type NestedEnumStatusDanaFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusDana | EnumStatusDanaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusDana[] | ListEnumStatusDanaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusDana[] | ListEnumStatusDanaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusDanaFilter<$PrismaModel> | $Enums.StatusDana
  }

  export type NestedEnumStatusDanaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusDana | EnumStatusDanaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusDana[] | ListEnumStatusDanaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusDana[] | ListEnumStatusDanaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusDanaWithAggregatesFilter<$PrismaModel> | $Enums.StatusDana
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusDanaFilter<$PrismaModel>
    _max?: NestedEnumStatusDanaFilter<$PrismaModel>
  }

  export type PenghuniCreateWithoutUserInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    kamar?: KamarCreateNestedOneWithoutPenghuniInput
    pemesanan?: PemesananCreateNestedManyWithoutPenghuniInput
    komplain?: KomplainCreateNestedManyWithoutPenghuniInput
  }

  export type PenghuniUncheckedCreateWithoutUserInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    kamar_id?: string | null
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutPenghuniInput
    komplain?: KomplainUncheckedCreateNestedManyWithoutPenghuniInput
  }

  export type PenghuniCreateOrConnectWithoutUserInput = {
    where: PenghuniWhereUniqueInput
    create: XOR<PenghuniCreateWithoutUserInput, PenghuniUncheckedCreateWithoutUserInput>
  }

  export type OperatorCreateWithoutUserInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    properti: PropertiCreateNestedOneWithoutOperatorInput
    pengajuanDana?: PengajuanDanaCreateNestedManyWithoutOperatorInput
  }

  export type OperatorUncheckedCreateWithoutUserInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    properti_id: string
    pengajuanDana?: PengajuanDanaUncheckedCreateNestedManyWithoutOperatorInput
  }

  export type OperatorCreateOrConnectWithoutUserInput = {
    where: OperatorWhereUniqueInput
    create: XOR<OperatorCreateWithoutUserInput, OperatorUncheckedCreateWithoutUserInput>
  }

  export type PropertiCreateWithoutAdminInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    kamar?: KamarCreateNestedManyWithoutPropertiInput
    komplain?: KomplainCreateNestedManyWithoutPropertiInput
    operator?: OperatorCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaCreateNestedManyWithoutPropertiInput
  }

  export type PropertiUncheckedCreateWithoutAdminInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    kamar?: KamarUncheckedCreateNestedManyWithoutPropertiInput
    komplain?: KomplainUncheckedCreateNestedManyWithoutPropertiInput
    operator?: OperatorUncheckedCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaUncheckedCreateNestedManyWithoutPropertiInput
  }

  export type PropertiCreateOrConnectWithoutAdminInput = {
    where: PropertiWhereUniqueInput
    create: XOR<PropertiCreateWithoutAdminInput, PropertiUncheckedCreateWithoutAdminInput>
  }

  export type PropertiCreateManyAdminInputEnvelope = {
    data: PropertiCreateManyAdminInput | PropertiCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type AdminSettingsCreateWithoutUserInput = {
    id?: string
    nama_rekening?: string | null
    nomor_rekening?: string | null
    bank?: string | null
    qris_image?: string | null
    updated_at?: Date | string
  }

  export type AdminSettingsUncheckedCreateWithoutUserInput = {
    id?: string
    nama_rekening?: string | null
    nomor_rekening?: string | null
    bank?: string | null
    qris_image?: string | null
    updated_at?: Date | string
  }

  export type AdminSettingsCreateOrConnectWithoutUserInput = {
    where: AdminSettingsWhereUniqueInput
    create: XOR<AdminSettingsCreateWithoutUserInput, AdminSettingsUncheckedCreateWithoutUserInput>
  }

  export type PenghuniUpsertWithoutUserInput = {
    update: XOR<PenghuniUpdateWithoutUserInput, PenghuniUncheckedUpdateWithoutUserInput>
    create: XOR<PenghuniCreateWithoutUserInput, PenghuniUncheckedCreateWithoutUserInput>
    where?: PenghuniWhereInput
  }

  export type PenghuniUpdateToOneWithWhereWithoutUserInput = {
    where?: PenghuniWhereInput
    data: XOR<PenghuniUpdateWithoutUserInput, PenghuniUncheckedUpdateWithoutUserInput>
  }

  export type PenghuniUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar?: KamarUpdateOneWithoutPenghuniNestedInput
    pemesanan?: PemesananUpdateManyWithoutPenghuniNestedInput
    komplain?: KomplainUpdateManyWithoutPenghuniNestedInput
  }

  export type PenghuniUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar_id?: NullableStringFieldUpdateOperationsInput | string | null
    pemesanan?: PemesananUncheckedUpdateManyWithoutPenghuniNestedInput
    komplain?: KomplainUncheckedUpdateManyWithoutPenghuniNestedInput
  }

  export type OperatorUpsertWithoutUserInput = {
    update: XOR<OperatorUpdateWithoutUserInput, OperatorUncheckedUpdateWithoutUserInput>
    create: XOR<OperatorCreateWithoutUserInput, OperatorUncheckedCreateWithoutUserInput>
    where?: OperatorWhereInput
  }

  export type OperatorUpdateToOneWithWhereWithoutUserInput = {
    where?: OperatorWhereInput
    data: XOR<OperatorUpdateWithoutUserInput, OperatorUncheckedUpdateWithoutUserInput>
  }

  export type OperatorUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti?: PropertiUpdateOneRequiredWithoutOperatorNestedInput
    pengajuanDana?: PengajuanDanaUpdateManyWithoutOperatorNestedInput
  }

  export type OperatorUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti_id?: StringFieldUpdateOperationsInput | string
    pengajuanDana?: PengajuanDanaUncheckedUpdateManyWithoutOperatorNestedInput
  }

  export type PropertiUpsertWithWhereUniqueWithoutAdminInput = {
    where: PropertiWhereUniqueInput
    update: XOR<PropertiUpdateWithoutAdminInput, PropertiUncheckedUpdateWithoutAdminInput>
    create: XOR<PropertiCreateWithoutAdminInput, PropertiUncheckedCreateWithoutAdminInput>
  }

  export type PropertiUpdateWithWhereUniqueWithoutAdminInput = {
    where: PropertiWhereUniqueInput
    data: XOR<PropertiUpdateWithoutAdminInput, PropertiUncheckedUpdateWithoutAdminInput>
  }

  export type PropertiUpdateManyWithWhereWithoutAdminInput = {
    where: PropertiScalarWhereInput
    data: XOR<PropertiUpdateManyMutationInput, PropertiUncheckedUpdateManyWithoutAdminInput>
  }

  export type PropertiScalarWhereInput = {
    AND?: PropertiScalarWhereInput | PropertiScalarWhereInput[]
    OR?: PropertiScalarWhereInput[]
    NOT?: PropertiScalarWhereInput | PropertiScalarWhereInput[]
    id?: StringFilter<"Properti"> | string
    nama?: StringFilter<"Properti"> | string
    alamat?: StringFilter<"Properti"> | string
    jenis?: EnumJenisPropertiNullableFilter<"Properti"> | $Enums.JenisProperti | null
    deskripsi?: StringNullableFilter<"Properti"> | string | null
    kebijakan?: StringNullableFilter<"Properti"> | string | null
    gambar?: StringNullableListFilter<"Properti">
    created_at?: DateTimeFilter<"Properti"> | Date | string
    updated_at?: DateTimeFilter<"Properti"> | Date | string
    admin_id?: StringFilter<"Properti"> | string
  }

  export type AdminSettingsUpsertWithoutUserInput = {
    update: XOR<AdminSettingsUpdateWithoutUserInput, AdminSettingsUncheckedUpdateWithoutUserInput>
    create: XOR<AdminSettingsCreateWithoutUserInput, AdminSettingsUncheckedCreateWithoutUserInput>
    where?: AdminSettingsWhereInput
  }

  export type AdminSettingsUpdateToOneWithWhereWithoutUserInput = {
    where?: AdminSettingsWhereInput
    data: XOR<AdminSettingsUpdateWithoutUserInput, AdminSettingsUncheckedUpdateWithoutUserInput>
  }

  export type AdminSettingsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    nomor_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    bank?: NullableStringFieldUpdateOperationsInput | string | null
    qris_image?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    nomor_rekening?: NullableStringFieldUpdateOperationsInput | string | null
    bank?: NullableStringFieldUpdateOperationsInput | string | null
    qris_image?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutSettingsInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    penghuni?: PenghuniCreateNestedOneWithoutUserInput
    operator?: OperatorCreateNestedOneWithoutUserInput
    properti?: PropertiCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutSettingsInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    penghuni?: PenghuniUncheckedCreateNestedOneWithoutUserInput
    operator?: OperatorUncheckedCreateNestedOneWithoutUserInput
    properti?: PropertiUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutSettingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
  }

  export type UserUpsertWithoutSettingsInput = {
    update: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSettingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type UserUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUpdateOneWithoutUserNestedInput
    operator?: OperatorUpdateOneWithoutUserNestedInput
    properti?: PropertiUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUncheckedUpdateOneWithoutUserNestedInput
    operator?: OperatorUncheckedUpdateOneWithoutUserNestedInput
    properti?: PropertiUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateWithoutPropertiInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    penghuni?: PenghuniCreateNestedOneWithoutUserInput
    operator?: OperatorCreateNestedOneWithoutUserInput
    settings?: AdminSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPropertiInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    penghuni?: PenghuniUncheckedCreateNestedOneWithoutUserInput
    operator?: OperatorUncheckedCreateNestedOneWithoutUserInput
    settings?: AdminSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPropertiInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPropertiInput, UserUncheckedCreateWithoutPropertiInput>
  }

  export type KamarCreateWithoutPropertiInput = {
    id?: string
    nomor: string
    tipe?: $Enums.TipeKamar
    luas?: string | null
    fasilitas?: KamarCreatefasilitasInput | string[]
    deskripsi?: string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarCreategambarInput | string[]
    status?: $Enums.StatusKamar
    created_at?: Date | string
    updated_at?: Date | string
    pemesanan?: PemesananCreateNestedManyWithoutKamarInput
    penghuni?: PenghuniCreateNestedOneWithoutKamarInput
  }

  export type KamarUncheckedCreateWithoutPropertiInput = {
    id?: string
    nomor: string
    tipe?: $Enums.TipeKamar
    luas?: string | null
    fasilitas?: KamarCreatefasilitasInput | string[]
    deskripsi?: string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarCreategambarInput | string[]
    status?: $Enums.StatusKamar
    created_at?: Date | string
    updated_at?: Date | string
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutKamarInput
    penghuni?: PenghuniUncheckedCreateNestedOneWithoutKamarInput
  }

  export type KamarCreateOrConnectWithoutPropertiInput = {
    where: KamarWhereUniqueInput
    create: XOR<KamarCreateWithoutPropertiInput, KamarUncheckedCreateWithoutPropertiInput>
  }

  export type KamarCreateManyPropertiInputEnvelope = {
    data: KamarCreateManyPropertiInput | KamarCreateManyPropertiInput[]
    skipDuplicates?: boolean
  }

  export type KomplainCreateWithoutPropertiInput = {
    id?: string
    masalah: string
    jenis: $Enums.JenisKomplain
    deskripsi: string
    foto?: string | null
    status?: $Enums.StatusKomplain
    created_at?: Date | string
    updated_at?: Date | string
    penghuni: PenghuniCreateNestedOneWithoutKomplainInput
  }

  export type KomplainUncheckedCreateWithoutPropertiInput = {
    id?: string
    masalah: string
    jenis: $Enums.JenisKomplain
    deskripsi: string
    foto?: string | null
    status?: $Enums.StatusKomplain
    created_at?: Date | string
    updated_at?: Date | string
    penghuni_id: string
  }

  export type KomplainCreateOrConnectWithoutPropertiInput = {
    where: KomplainWhereUniqueInput
    create: XOR<KomplainCreateWithoutPropertiInput, KomplainUncheckedCreateWithoutPropertiInput>
  }

  export type KomplainCreateManyPropertiInputEnvelope = {
    data: KomplainCreateManyPropertiInput | KomplainCreateManyPropertiInput[]
    skipDuplicates?: boolean
  }

  export type OperatorCreateWithoutPropertiInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutOperatorInput
    pengajuanDana?: PengajuanDanaCreateNestedManyWithoutOperatorInput
  }

  export type OperatorUncheckedCreateWithoutPropertiInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    pengajuanDana?: PengajuanDanaUncheckedCreateNestedManyWithoutOperatorInput
  }

  export type OperatorCreateOrConnectWithoutPropertiInput = {
    where: OperatorWhereUniqueInput
    create: XOR<OperatorCreateWithoutPropertiInput, OperatorUncheckedCreateWithoutPropertiInput>
  }

  export type OperatorCreateManyPropertiInputEnvelope = {
    data: OperatorCreateManyPropertiInput | OperatorCreateManyPropertiInput[]
    skipDuplicates?: boolean
  }

  export type PemesananCreateWithoutPropertiInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar: KamarCreateNestedOneWithoutPemesananInput
    penghuni: PenghuniCreateNestedOneWithoutPemesananInput
    pembayaran?: PembayaranCreateNestedOneWithoutPemesananInput
  }

  export type PemesananUncheckedCreateWithoutPropertiInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar_id: string
    penghuni_id: string
    pembayaran?: PembayaranUncheckedCreateNestedOneWithoutPemesananInput
  }

  export type PemesananCreateOrConnectWithoutPropertiInput = {
    where: PemesananWhereUniqueInput
    create: XOR<PemesananCreateWithoutPropertiInput, PemesananUncheckedCreateWithoutPropertiInput>
  }

  export type PemesananCreateManyPropertiInputEnvelope = {
    data: PemesananCreateManyPropertiInput | PemesananCreateManyPropertiInput[]
    skipDuplicates?: boolean
  }

  export type PengajuanDanaCreateWithoutPropertiInput = {
    id?: string
    tujuan: string
    jumlah: number
    no_rekening: string
    foto?: string | null
    status?: $Enums.StatusDana
    created_at?: Date | string
    updated_at?: Date | string
    operator: OperatorCreateNestedOneWithoutPengajuanDanaInput
  }

  export type PengajuanDanaUncheckedCreateWithoutPropertiInput = {
    id?: string
    tujuan: string
    jumlah: number
    no_rekening: string
    foto?: string | null
    status?: $Enums.StatusDana
    created_at?: Date | string
    updated_at?: Date | string
    operator_id: string
  }

  export type PengajuanDanaCreateOrConnectWithoutPropertiInput = {
    where: PengajuanDanaWhereUniqueInput
    create: XOR<PengajuanDanaCreateWithoutPropertiInput, PengajuanDanaUncheckedCreateWithoutPropertiInput>
  }

  export type PengajuanDanaCreateManyPropertiInputEnvelope = {
    data: PengajuanDanaCreateManyPropertiInput | PengajuanDanaCreateManyPropertiInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPropertiInput = {
    update: XOR<UserUpdateWithoutPropertiInput, UserUncheckedUpdateWithoutPropertiInput>
    create: XOR<UserCreateWithoutPropertiInput, UserUncheckedCreateWithoutPropertiInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPropertiInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPropertiInput, UserUncheckedUpdateWithoutPropertiInput>
  }

  export type UserUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUpdateOneWithoutUserNestedInput
    operator?: OperatorUpdateOneWithoutUserNestedInput
    settings?: AdminSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUncheckedUpdateOneWithoutUserNestedInput
    operator?: OperatorUncheckedUpdateOneWithoutUserNestedInput
    settings?: AdminSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type KamarUpsertWithWhereUniqueWithoutPropertiInput = {
    where: KamarWhereUniqueInput
    update: XOR<KamarUpdateWithoutPropertiInput, KamarUncheckedUpdateWithoutPropertiInput>
    create: XOR<KamarCreateWithoutPropertiInput, KamarUncheckedCreateWithoutPropertiInput>
  }

  export type KamarUpdateWithWhereUniqueWithoutPropertiInput = {
    where: KamarWhereUniqueInput
    data: XOR<KamarUpdateWithoutPropertiInput, KamarUncheckedUpdateWithoutPropertiInput>
  }

  export type KamarUpdateManyWithWhereWithoutPropertiInput = {
    where: KamarScalarWhereInput
    data: XOR<KamarUpdateManyMutationInput, KamarUncheckedUpdateManyWithoutPropertiInput>
  }

  export type KamarScalarWhereInput = {
    AND?: KamarScalarWhereInput | KamarScalarWhereInput[]
    OR?: KamarScalarWhereInput[]
    NOT?: KamarScalarWhereInput | KamarScalarWhereInput[]
    id?: StringFilter<"Kamar"> | string
    nomor?: StringFilter<"Kamar"> | string
    tipe?: EnumTipeKamarFilter<"Kamar"> | $Enums.TipeKamar
    luas?: StringNullableFilter<"Kamar"> | string | null
    fasilitas?: StringNullableListFilter<"Kamar">
    deskripsi?: StringNullableFilter<"Kamar"> | string | null
    tarif?: JsonNullableFilter<"Kamar">
    gambar?: StringNullableListFilter<"Kamar">
    status?: EnumStatusKamarFilter<"Kamar"> | $Enums.StatusKamar
    created_at?: DateTimeFilter<"Kamar"> | Date | string
    updated_at?: DateTimeFilter<"Kamar"> | Date | string
    properti_id?: StringFilter<"Kamar"> | string
  }

  export type KomplainUpsertWithWhereUniqueWithoutPropertiInput = {
    where: KomplainWhereUniqueInput
    update: XOR<KomplainUpdateWithoutPropertiInput, KomplainUncheckedUpdateWithoutPropertiInput>
    create: XOR<KomplainCreateWithoutPropertiInput, KomplainUncheckedCreateWithoutPropertiInput>
  }

  export type KomplainUpdateWithWhereUniqueWithoutPropertiInput = {
    where: KomplainWhereUniqueInput
    data: XOR<KomplainUpdateWithoutPropertiInput, KomplainUncheckedUpdateWithoutPropertiInput>
  }

  export type KomplainUpdateManyWithWhereWithoutPropertiInput = {
    where: KomplainScalarWhereInput
    data: XOR<KomplainUpdateManyMutationInput, KomplainUncheckedUpdateManyWithoutPropertiInput>
  }

  export type KomplainScalarWhereInput = {
    AND?: KomplainScalarWhereInput | KomplainScalarWhereInput[]
    OR?: KomplainScalarWhereInput[]
    NOT?: KomplainScalarWhereInput | KomplainScalarWhereInput[]
    id?: StringFilter<"Komplain"> | string
    masalah?: StringFilter<"Komplain"> | string
    jenis?: EnumJenisKomplainFilter<"Komplain"> | $Enums.JenisKomplain
    deskripsi?: StringFilter<"Komplain"> | string
    foto?: StringNullableFilter<"Komplain"> | string | null
    status?: EnumStatusKomplainFilter<"Komplain"> | $Enums.StatusKomplain
    created_at?: DateTimeFilter<"Komplain"> | Date | string
    updated_at?: DateTimeFilter<"Komplain"> | Date | string
    penghuni_id?: StringFilter<"Komplain"> | string
    properti_id?: StringFilter<"Komplain"> | string
  }

  export type OperatorUpsertWithWhereUniqueWithoutPropertiInput = {
    where: OperatorWhereUniqueInput
    update: XOR<OperatorUpdateWithoutPropertiInput, OperatorUncheckedUpdateWithoutPropertiInput>
    create: XOR<OperatorCreateWithoutPropertiInput, OperatorUncheckedCreateWithoutPropertiInput>
  }

  export type OperatorUpdateWithWhereUniqueWithoutPropertiInput = {
    where: OperatorWhereUniqueInput
    data: XOR<OperatorUpdateWithoutPropertiInput, OperatorUncheckedUpdateWithoutPropertiInput>
  }

  export type OperatorUpdateManyWithWhereWithoutPropertiInput = {
    where: OperatorScalarWhereInput
    data: XOR<OperatorUpdateManyMutationInput, OperatorUncheckedUpdateManyWithoutPropertiInput>
  }

  export type OperatorScalarWhereInput = {
    AND?: OperatorScalarWhereInput | OperatorScalarWhereInput[]
    OR?: OperatorScalarWhereInput[]
    NOT?: OperatorScalarWhereInput | OperatorScalarWhereInput[]
    id?: StringFilter<"Operator"> | string
    created_at?: DateTimeFilter<"Operator"> | Date | string
    updated_at?: DateTimeFilter<"Operator"> | Date | string
    user_id?: StringFilter<"Operator"> | string
    properti_id?: StringFilter<"Operator"> | string
  }

  export type PemesananUpsertWithWhereUniqueWithoutPropertiInput = {
    where: PemesananWhereUniqueInput
    update: XOR<PemesananUpdateWithoutPropertiInput, PemesananUncheckedUpdateWithoutPropertiInput>
    create: XOR<PemesananCreateWithoutPropertiInput, PemesananUncheckedCreateWithoutPropertiInput>
  }

  export type PemesananUpdateWithWhereUniqueWithoutPropertiInput = {
    where: PemesananWhereUniqueInput
    data: XOR<PemesananUpdateWithoutPropertiInput, PemesananUncheckedUpdateWithoutPropertiInput>
  }

  export type PemesananUpdateManyWithWhereWithoutPropertiInput = {
    where: PemesananScalarWhereInput
    data: XOR<PemesananUpdateManyMutationInput, PemesananUncheckedUpdateManyWithoutPropertiInput>
  }

  export type PemesananScalarWhereInput = {
    AND?: PemesananScalarWhereInput | PemesananScalarWhereInput[]
    OR?: PemesananScalarWhereInput[]
    NOT?: PemesananScalarWhereInput | PemesananScalarWhereInput[]
    id?: StringFilter<"Pemesanan"> | string
    durasi_sewa?: IntFilter<"Pemesanan"> | number
    tgl_masuk?: DateTimeFilter<"Pemesanan"> | Date | string
    metode_bayar?: StringFilter<"Pemesanan"> | string
    total_bayar?: IntFilter<"Pemesanan"> | number
    status?: EnumStatusPemesananFilter<"Pemesanan"> | $Enums.StatusPemesanan
    created_at?: DateTimeFilter<"Pemesanan"> | Date | string
    updated_at?: DateTimeFilter<"Pemesanan"> | Date | string
    kamar_id?: StringFilter<"Pemesanan"> | string
    penghuni_id?: StringFilter<"Pemesanan"> | string
    properti_id?: StringFilter<"Pemesanan"> | string
  }

  export type PengajuanDanaUpsertWithWhereUniqueWithoutPropertiInput = {
    where: PengajuanDanaWhereUniqueInput
    update: XOR<PengajuanDanaUpdateWithoutPropertiInput, PengajuanDanaUncheckedUpdateWithoutPropertiInput>
    create: XOR<PengajuanDanaCreateWithoutPropertiInput, PengajuanDanaUncheckedCreateWithoutPropertiInput>
  }

  export type PengajuanDanaUpdateWithWhereUniqueWithoutPropertiInput = {
    where: PengajuanDanaWhereUniqueInput
    data: XOR<PengajuanDanaUpdateWithoutPropertiInput, PengajuanDanaUncheckedUpdateWithoutPropertiInput>
  }

  export type PengajuanDanaUpdateManyWithWhereWithoutPropertiInput = {
    where: PengajuanDanaScalarWhereInput
    data: XOR<PengajuanDanaUpdateManyMutationInput, PengajuanDanaUncheckedUpdateManyWithoutPropertiInput>
  }

  export type PengajuanDanaScalarWhereInput = {
    AND?: PengajuanDanaScalarWhereInput | PengajuanDanaScalarWhereInput[]
    OR?: PengajuanDanaScalarWhereInput[]
    NOT?: PengajuanDanaScalarWhereInput | PengajuanDanaScalarWhereInput[]
    id?: StringFilter<"PengajuanDana"> | string
    tujuan?: StringFilter<"PengajuanDana"> | string
    jumlah?: IntFilter<"PengajuanDana"> | number
    no_rekening?: StringFilter<"PengajuanDana"> | string
    foto?: StringNullableFilter<"PengajuanDana"> | string | null
    status?: EnumStatusDanaFilter<"PengajuanDana"> | $Enums.StatusDana
    created_at?: DateTimeFilter<"PengajuanDana"> | Date | string
    updated_at?: DateTimeFilter<"PengajuanDana"> | Date | string
    operator_id?: StringFilter<"PengajuanDana"> | string
    properti_id?: StringFilter<"PengajuanDana"> | string
  }

  export type PropertiCreateWithoutKamarInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin: UserCreateNestedOneWithoutPropertiInput
    komplain?: KomplainCreateNestedManyWithoutPropertiInput
    operator?: OperatorCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaCreateNestedManyWithoutPropertiInput
  }

  export type PropertiUncheckedCreateWithoutKamarInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin_id: string
    komplain?: KomplainUncheckedCreateNestedManyWithoutPropertiInput
    operator?: OperatorUncheckedCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaUncheckedCreateNestedManyWithoutPropertiInput
  }

  export type PropertiCreateOrConnectWithoutKamarInput = {
    where: PropertiWhereUniqueInput
    create: XOR<PropertiCreateWithoutKamarInput, PropertiUncheckedCreateWithoutKamarInput>
  }

  export type PemesananCreateWithoutKamarInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    penghuni: PenghuniCreateNestedOneWithoutPemesananInput
    properti: PropertiCreateNestedOneWithoutPemesananInput
    pembayaran?: PembayaranCreateNestedOneWithoutPemesananInput
  }

  export type PemesananUncheckedCreateWithoutKamarInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    penghuni_id: string
    properti_id: string
    pembayaran?: PembayaranUncheckedCreateNestedOneWithoutPemesananInput
  }

  export type PemesananCreateOrConnectWithoutKamarInput = {
    where: PemesananWhereUniqueInput
    create: XOR<PemesananCreateWithoutKamarInput, PemesananUncheckedCreateWithoutKamarInput>
  }

  export type PemesananCreateManyKamarInputEnvelope = {
    data: PemesananCreateManyKamarInput | PemesananCreateManyKamarInput[]
    skipDuplicates?: boolean
  }

  export type PenghuniCreateWithoutKamarInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutPenghuniInput
    pemesanan?: PemesananCreateNestedManyWithoutPenghuniInput
    komplain?: KomplainCreateNestedManyWithoutPenghuniInput
  }

  export type PenghuniUncheckedCreateWithoutKamarInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutPenghuniInput
    komplain?: KomplainUncheckedCreateNestedManyWithoutPenghuniInput
  }

  export type PenghuniCreateOrConnectWithoutKamarInput = {
    where: PenghuniWhereUniqueInput
    create: XOR<PenghuniCreateWithoutKamarInput, PenghuniUncheckedCreateWithoutKamarInput>
  }

  export type PropertiUpsertWithoutKamarInput = {
    update: XOR<PropertiUpdateWithoutKamarInput, PropertiUncheckedUpdateWithoutKamarInput>
    create: XOR<PropertiCreateWithoutKamarInput, PropertiUncheckedCreateWithoutKamarInput>
    where?: PropertiWhereInput
  }

  export type PropertiUpdateToOneWithWhereWithoutKamarInput = {
    where?: PropertiWhereInput
    data: XOR<PropertiUpdateWithoutKamarInput, PropertiUncheckedUpdateWithoutKamarInput>
  }

  export type PropertiUpdateWithoutKamarInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutPropertiNestedInput
    komplain?: KomplainUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUpdateManyWithoutPropertiNestedInput
  }

  export type PropertiUncheckedUpdateWithoutKamarInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: StringFieldUpdateOperationsInput | string
    komplain?: KomplainUncheckedUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUncheckedUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUncheckedUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUncheckedUpdateManyWithoutPropertiNestedInput
  }

  export type PemesananUpsertWithWhereUniqueWithoutKamarInput = {
    where: PemesananWhereUniqueInput
    update: XOR<PemesananUpdateWithoutKamarInput, PemesananUncheckedUpdateWithoutKamarInput>
    create: XOR<PemesananCreateWithoutKamarInput, PemesananUncheckedCreateWithoutKamarInput>
  }

  export type PemesananUpdateWithWhereUniqueWithoutKamarInput = {
    where: PemesananWhereUniqueInput
    data: XOR<PemesananUpdateWithoutKamarInput, PemesananUncheckedUpdateWithoutKamarInput>
  }

  export type PemesananUpdateManyWithWhereWithoutKamarInput = {
    where: PemesananScalarWhereInput
    data: XOR<PemesananUpdateManyMutationInput, PemesananUncheckedUpdateManyWithoutKamarInput>
  }

  export type PenghuniUpsertWithoutKamarInput = {
    update: XOR<PenghuniUpdateWithoutKamarInput, PenghuniUncheckedUpdateWithoutKamarInput>
    create: XOR<PenghuniCreateWithoutKamarInput, PenghuniUncheckedCreateWithoutKamarInput>
    where?: PenghuniWhereInput
  }

  export type PenghuniUpdateToOneWithWhereWithoutKamarInput = {
    where?: PenghuniWhereInput
    data: XOR<PenghuniUpdateWithoutKamarInput, PenghuniUncheckedUpdateWithoutKamarInput>
  }

  export type PenghuniUpdateWithoutKamarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPenghuniNestedInput
    pemesanan?: PemesananUpdateManyWithoutPenghuniNestedInput
    komplain?: KomplainUpdateManyWithoutPenghuniNestedInput
  }

  export type PenghuniUncheckedUpdateWithoutKamarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    pemesanan?: PemesananUncheckedUpdateManyWithoutPenghuniNestedInput
    komplain?: KomplainUncheckedUpdateManyWithoutPenghuniNestedInput
  }

  export type KamarCreateWithoutPemesananInput = {
    id?: string
    nomor: string
    tipe?: $Enums.TipeKamar
    luas?: string | null
    fasilitas?: KamarCreatefasilitasInput | string[]
    deskripsi?: string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarCreategambarInput | string[]
    status?: $Enums.StatusKamar
    created_at?: Date | string
    updated_at?: Date | string
    properti: PropertiCreateNestedOneWithoutKamarInput
    penghuni?: PenghuniCreateNestedOneWithoutKamarInput
  }

  export type KamarUncheckedCreateWithoutPemesananInput = {
    id?: string
    nomor: string
    tipe?: $Enums.TipeKamar
    luas?: string | null
    fasilitas?: KamarCreatefasilitasInput | string[]
    deskripsi?: string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarCreategambarInput | string[]
    status?: $Enums.StatusKamar
    created_at?: Date | string
    updated_at?: Date | string
    properti_id: string
    penghuni?: PenghuniUncheckedCreateNestedOneWithoutKamarInput
  }

  export type KamarCreateOrConnectWithoutPemesananInput = {
    where: KamarWhereUniqueInput
    create: XOR<KamarCreateWithoutPemesananInput, KamarUncheckedCreateWithoutPemesananInput>
  }

  export type PenghuniCreateWithoutPemesananInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutPenghuniInput
    kamar?: KamarCreateNestedOneWithoutPenghuniInput
    komplain?: KomplainCreateNestedManyWithoutPenghuniInput
  }

  export type PenghuniUncheckedCreateWithoutPemesananInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    kamar_id?: string | null
    komplain?: KomplainUncheckedCreateNestedManyWithoutPenghuniInput
  }

  export type PenghuniCreateOrConnectWithoutPemesananInput = {
    where: PenghuniWhereUniqueInput
    create: XOR<PenghuniCreateWithoutPemesananInput, PenghuniUncheckedCreateWithoutPemesananInput>
  }

  export type PropertiCreateWithoutPemesananInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin: UserCreateNestedOneWithoutPropertiInput
    kamar?: KamarCreateNestedManyWithoutPropertiInput
    komplain?: KomplainCreateNestedManyWithoutPropertiInput
    operator?: OperatorCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaCreateNestedManyWithoutPropertiInput
  }

  export type PropertiUncheckedCreateWithoutPemesananInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin_id: string
    kamar?: KamarUncheckedCreateNestedManyWithoutPropertiInput
    komplain?: KomplainUncheckedCreateNestedManyWithoutPropertiInput
    operator?: OperatorUncheckedCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaUncheckedCreateNestedManyWithoutPropertiInput
  }

  export type PropertiCreateOrConnectWithoutPemesananInput = {
    where: PropertiWhereUniqueInput
    create: XOR<PropertiCreateWithoutPemesananInput, PropertiUncheckedCreateWithoutPemesananInput>
  }

  export type PembayaranCreateWithoutPemesananInput = {
    id?: string
    metode_bayar: string
    bukti?: string | null
    status?: $Enums.StatusPembayaran
    tgl_bayar?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PembayaranUncheckedCreateWithoutPemesananInput = {
    id?: string
    metode_bayar: string
    bukti?: string | null
    status?: $Enums.StatusPembayaran
    tgl_bayar?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PembayaranCreateOrConnectWithoutPemesananInput = {
    where: PembayaranWhereUniqueInput
    create: XOR<PembayaranCreateWithoutPemesananInput, PembayaranUncheckedCreateWithoutPemesananInput>
  }

  export type KamarUpsertWithoutPemesananInput = {
    update: XOR<KamarUpdateWithoutPemesananInput, KamarUncheckedUpdateWithoutPemesananInput>
    create: XOR<KamarCreateWithoutPemesananInput, KamarUncheckedCreateWithoutPemesananInput>
    where?: KamarWhereInput
  }

  export type KamarUpdateToOneWithWhereWithoutPemesananInput = {
    where?: KamarWhereInput
    data: XOR<KamarUpdateWithoutPemesananInput, KamarUncheckedUpdateWithoutPemesananInput>
  }

  export type KamarUpdateWithoutPemesananInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti?: PropertiUpdateOneRequiredWithoutKamarNestedInput
    penghuni?: PenghuniUpdateOneWithoutKamarNestedInput
  }

  export type KamarUncheckedUpdateWithoutPemesananInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti_id?: StringFieldUpdateOperationsInput | string
    penghuni?: PenghuniUncheckedUpdateOneWithoutKamarNestedInput
  }

  export type PenghuniUpsertWithoutPemesananInput = {
    update: XOR<PenghuniUpdateWithoutPemesananInput, PenghuniUncheckedUpdateWithoutPemesananInput>
    create: XOR<PenghuniCreateWithoutPemesananInput, PenghuniUncheckedCreateWithoutPemesananInput>
    where?: PenghuniWhereInput
  }

  export type PenghuniUpdateToOneWithWhereWithoutPemesananInput = {
    where?: PenghuniWhereInput
    data: XOR<PenghuniUpdateWithoutPemesananInput, PenghuniUncheckedUpdateWithoutPemesananInput>
  }

  export type PenghuniUpdateWithoutPemesananInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPenghuniNestedInput
    kamar?: KamarUpdateOneWithoutPenghuniNestedInput
    komplain?: KomplainUpdateManyWithoutPenghuniNestedInput
  }

  export type PenghuniUncheckedUpdateWithoutPemesananInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    kamar_id?: NullableStringFieldUpdateOperationsInput | string | null
    komplain?: KomplainUncheckedUpdateManyWithoutPenghuniNestedInput
  }

  export type PropertiUpsertWithoutPemesananInput = {
    update: XOR<PropertiUpdateWithoutPemesananInput, PropertiUncheckedUpdateWithoutPemesananInput>
    create: XOR<PropertiCreateWithoutPemesananInput, PropertiUncheckedCreateWithoutPemesananInput>
    where?: PropertiWhereInput
  }

  export type PropertiUpdateToOneWithWhereWithoutPemesananInput = {
    where?: PropertiWhereInput
    data: XOR<PropertiUpdateWithoutPemesananInput, PropertiUncheckedUpdateWithoutPemesananInput>
  }

  export type PropertiUpdateWithoutPemesananInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutPropertiNestedInput
    kamar?: KamarUpdateManyWithoutPropertiNestedInput
    komplain?: KomplainUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUpdateManyWithoutPropertiNestedInput
  }

  export type PropertiUncheckedUpdateWithoutPemesananInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: StringFieldUpdateOperationsInput | string
    kamar?: KamarUncheckedUpdateManyWithoutPropertiNestedInput
    komplain?: KomplainUncheckedUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUncheckedUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUncheckedUpdateManyWithoutPropertiNestedInput
  }

  export type PembayaranUpsertWithoutPemesananInput = {
    update: XOR<PembayaranUpdateWithoutPemesananInput, PembayaranUncheckedUpdateWithoutPemesananInput>
    create: XOR<PembayaranCreateWithoutPemesananInput, PembayaranUncheckedCreateWithoutPemesananInput>
    where?: PembayaranWhereInput
  }

  export type PembayaranUpdateToOneWithWhereWithoutPemesananInput = {
    where?: PembayaranWhereInput
    data: XOR<PembayaranUpdateWithoutPemesananInput, PembayaranUncheckedUpdateWithoutPemesananInput>
  }

  export type PembayaranUpdateWithoutPemesananInput = {
    id?: StringFieldUpdateOperationsInput | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    bukti?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusPembayaranFieldUpdateOperationsInput | $Enums.StatusPembayaran
    tgl_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PembayaranUncheckedUpdateWithoutPemesananInput = {
    id?: StringFieldUpdateOperationsInput | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    bukti?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusPembayaranFieldUpdateOperationsInput | $Enums.StatusPembayaran
    tgl_bayar?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PemesananCreateWithoutPembayaranInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar: KamarCreateNestedOneWithoutPemesananInput
    penghuni: PenghuniCreateNestedOneWithoutPemesananInput
    properti: PropertiCreateNestedOneWithoutPemesananInput
  }

  export type PemesananUncheckedCreateWithoutPembayaranInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar_id: string
    penghuni_id: string
    properti_id: string
  }

  export type PemesananCreateOrConnectWithoutPembayaranInput = {
    where: PemesananWhereUniqueInput
    create: XOR<PemesananCreateWithoutPembayaranInput, PemesananUncheckedCreateWithoutPembayaranInput>
  }

  export type PemesananUpsertWithoutPembayaranInput = {
    update: XOR<PemesananUpdateWithoutPembayaranInput, PemesananUncheckedUpdateWithoutPembayaranInput>
    create: XOR<PemesananCreateWithoutPembayaranInput, PemesananUncheckedCreateWithoutPembayaranInput>
    where?: PemesananWhereInput
  }

  export type PemesananUpdateToOneWithWhereWithoutPembayaranInput = {
    where?: PemesananWhereInput
    data: XOR<PemesananUpdateWithoutPembayaranInput, PemesananUncheckedUpdateWithoutPembayaranInput>
  }

  export type PemesananUpdateWithoutPembayaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar?: KamarUpdateOneRequiredWithoutPemesananNestedInput
    penghuni?: PenghuniUpdateOneRequiredWithoutPemesananNestedInput
    properti?: PropertiUpdateOneRequiredWithoutPemesananNestedInput
  }

  export type PemesananUncheckedUpdateWithoutPembayaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar_id?: StringFieldUpdateOperationsInput | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutPenghuniInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    operator?: OperatorCreateNestedOneWithoutUserInput
    properti?: PropertiCreateNestedManyWithoutAdminInput
    settings?: AdminSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPenghuniInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    operator?: OperatorUncheckedCreateNestedOneWithoutUserInput
    properti?: PropertiUncheckedCreateNestedManyWithoutAdminInput
    settings?: AdminSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPenghuniInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPenghuniInput, UserUncheckedCreateWithoutPenghuniInput>
  }

  export type KamarCreateWithoutPenghuniInput = {
    id?: string
    nomor: string
    tipe?: $Enums.TipeKamar
    luas?: string | null
    fasilitas?: KamarCreatefasilitasInput | string[]
    deskripsi?: string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarCreategambarInput | string[]
    status?: $Enums.StatusKamar
    created_at?: Date | string
    updated_at?: Date | string
    properti: PropertiCreateNestedOneWithoutKamarInput
    pemesanan?: PemesananCreateNestedManyWithoutKamarInput
  }

  export type KamarUncheckedCreateWithoutPenghuniInput = {
    id?: string
    nomor: string
    tipe?: $Enums.TipeKamar
    luas?: string | null
    fasilitas?: KamarCreatefasilitasInput | string[]
    deskripsi?: string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarCreategambarInput | string[]
    status?: $Enums.StatusKamar
    created_at?: Date | string
    updated_at?: Date | string
    properti_id: string
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutKamarInput
  }

  export type KamarCreateOrConnectWithoutPenghuniInput = {
    where: KamarWhereUniqueInput
    create: XOR<KamarCreateWithoutPenghuniInput, KamarUncheckedCreateWithoutPenghuniInput>
  }

  export type PemesananCreateWithoutPenghuniInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar: KamarCreateNestedOneWithoutPemesananInput
    properti: PropertiCreateNestedOneWithoutPemesananInput
    pembayaran?: PembayaranCreateNestedOneWithoutPemesananInput
  }

  export type PemesananUncheckedCreateWithoutPenghuniInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar_id: string
    properti_id: string
    pembayaran?: PembayaranUncheckedCreateNestedOneWithoutPemesananInput
  }

  export type PemesananCreateOrConnectWithoutPenghuniInput = {
    where: PemesananWhereUniqueInput
    create: XOR<PemesananCreateWithoutPenghuniInput, PemesananUncheckedCreateWithoutPenghuniInput>
  }

  export type PemesananCreateManyPenghuniInputEnvelope = {
    data: PemesananCreateManyPenghuniInput | PemesananCreateManyPenghuniInput[]
    skipDuplicates?: boolean
  }

  export type KomplainCreateWithoutPenghuniInput = {
    id?: string
    masalah: string
    jenis: $Enums.JenisKomplain
    deskripsi: string
    foto?: string | null
    status?: $Enums.StatusKomplain
    created_at?: Date | string
    updated_at?: Date | string
    properti: PropertiCreateNestedOneWithoutKomplainInput
  }

  export type KomplainUncheckedCreateWithoutPenghuniInput = {
    id?: string
    masalah: string
    jenis: $Enums.JenisKomplain
    deskripsi: string
    foto?: string | null
    status?: $Enums.StatusKomplain
    created_at?: Date | string
    updated_at?: Date | string
    properti_id: string
  }

  export type KomplainCreateOrConnectWithoutPenghuniInput = {
    where: KomplainWhereUniqueInput
    create: XOR<KomplainCreateWithoutPenghuniInput, KomplainUncheckedCreateWithoutPenghuniInput>
  }

  export type KomplainCreateManyPenghuniInputEnvelope = {
    data: KomplainCreateManyPenghuniInput | KomplainCreateManyPenghuniInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPenghuniInput = {
    update: XOR<UserUpdateWithoutPenghuniInput, UserUncheckedUpdateWithoutPenghuniInput>
    create: XOR<UserCreateWithoutPenghuniInput, UserUncheckedCreateWithoutPenghuniInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPenghuniInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPenghuniInput, UserUncheckedUpdateWithoutPenghuniInput>
  }

  export type UserUpdateWithoutPenghuniInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operator?: OperatorUpdateOneWithoutUserNestedInput
    properti?: PropertiUpdateManyWithoutAdminNestedInput
    settings?: AdminSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPenghuniInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operator?: OperatorUncheckedUpdateOneWithoutUserNestedInput
    properti?: PropertiUncheckedUpdateManyWithoutAdminNestedInput
    settings?: AdminSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type KamarUpsertWithoutPenghuniInput = {
    update: XOR<KamarUpdateWithoutPenghuniInput, KamarUncheckedUpdateWithoutPenghuniInput>
    create: XOR<KamarCreateWithoutPenghuniInput, KamarUncheckedCreateWithoutPenghuniInput>
    where?: KamarWhereInput
  }

  export type KamarUpdateToOneWithWhereWithoutPenghuniInput = {
    where?: KamarWhereInput
    data: XOR<KamarUpdateWithoutPenghuniInput, KamarUncheckedUpdateWithoutPenghuniInput>
  }

  export type KamarUpdateWithoutPenghuniInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti?: PropertiUpdateOneRequiredWithoutKamarNestedInput
    pemesanan?: PemesananUpdateManyWithoutKamarNestedInput
  }

  export type KamarUncheckedUpdateWithoutPenghuniInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti_id?: StringFieldUpdateOperationsInput | string
    pemesanan?: PemesananUncheckedUpdateManyWithoutKamarNestedInput
  }

  export type PemesananUpsertWithWhereUniqueWithoutPenghuniInput = {
    where: PemesananWhereUniqueInput
    update: XOR<PemesananUpdateWithoutPenghuniInput, PemesananUncheckedUpdateWithoutPenghuniInput>
    create: XOR<PemesananCreateWithoutPenghuniInput, PemesananUncheckedCreateWithoutPenghuniInput>
  }

  export type PemesananUpdateWithWhereUniqueWithoutPenghuniInput = {
    where: PemesananWhereUniqueInput
    data: XOR<PemesananUpdateWithoutPenghuniInput, PemesananUncheckedUpdateWithoutPenghuniInput>
  }

  export type PemesananUpdateManyWithWhereWithoutPenghuniInput = {
    where: PemesananScalarWhereInput
    data: XOR<PemesananUpdateManyMutationInput, PemesananUncheckedUpdateManyWithoutPenghuniInput>
  }

  export type KomplainUpsertWithWhereUniqueWithoutPenghuniInput = {
    where: KomplainWhereUniqueInput
    update: XOR<KomplainUpdateWithoutPenghuniInput, KomplainUncheckedUpdateWithoutPenghuniInput>
    create: XOR<KomplainCreateWithoutPenghuniInput, KomplainUncheckedCreateWithoutPenghuniInput>
  }

  export type KomplainUpdateWithWhereUniqueWithoutPenghuniInput = {
    where: KomplainWhereUniqueInput
    data: XOR<KomplainUpdateWithoutPenghuniInput, KomplainUncheckedUpdateWithoutPenghuniInput>
  }

  export type KomplainUpdateManyWithWhereWithoutPenghuniInput = {
    where: KomplainScalarWhereInput
    data: XOR<KomplainUpdateManyMutationInput, KomplainUncheckedUpdateManyWithoutPenghuniInput>
  }

  export type UserCreateWithoutOperatorInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    penghuni?: PenghuniCreateNestedOneWithoutUserInput
    properti?: PropertiCreateNestedManyWithoutAdminInput
    settings?: AdminSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOperatorInput = {
    id?: string
    username: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    no_telepon?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    penghuni?: PenghuniUncheckedCreateNestedOneWithoutUserInput
    properti?: PropertiUncheckedCreateNestedManyWithoutAdminInput
    settings?: AdminSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOperatorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOperatorInput, UserUncheckedCreateWithoutOperatorInput>
  }

  export type PropertiCreateWithoutOperatorInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin: UserCreateNestedOneWithoutPropertiInput
    kamar?: KamarCreateNestedManyWithoutPropertiInput
    komplain?: KomplainCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaCreateNestedManyWithoutPropertiInput
  }

  export type PropertiUncheckedCreateWithoutOperatorInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin_id: string
    kamar?: KamarUncheckedCreateNestedManyWithoutPropertiInput
    komplain?: KomplainUncheckedCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaUncheckedCreateNestedManyWithoutPropertiInput
  }

  export type PropertiCreateOrConnectWithoutOperatorInput = {
    where: PropertiWhereUniqueInput
    create: XOR<PropertiCreateWithoutOperatorInput, PropertiUncheckedCreateWithoutOperatorInput>
  }

  export type PengajuanDanaCreateWithoutOperatorInput = {
    id?: string
    tujuan: string
    jumlah: number
    no_rekening: string
    foto?: string | null
    status?: $Enums.StatusDana
    created_at?: Date | string
    updated_at?: Date | string
    properti: PropertiCreateNestedOneWithoutPengajuanDanaInput
  }

  export type PengajuanDanaUncheckedCreateWithoutOperatorInput = {
    id?: string
    tujuan: string
    jumlah: number
    no_rekening: string
    foto?: string | null
    status?: $Enums.StatusDana
    created_at?: Date | string
    updated_at?: Date | string
    properti_id: string
  }

  export type PengajuanDanaCreateOrConnectWithoutOperatorInput = {
    where: PengajuanDanaWhereUniqueInput
    create: XOR<PengajuanDanaCreateWithoutOperatorInput, PengajuanDanaUncheckedCreateWithoutOperatorInput>
  }

  export type PengajuanDanaCreateManyOperatorInputEnvelope = {
    data: PengajuanDanaCreateManyOperatorInput | PengajuanDanaCreateManyOperatorInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOperatorInput = {
    update: XOR<UserUpdateWithoutOperatorInput, UserUncheckedUpdateWithoutOperatorInput>
    create: XOR<UserCreateWithoutOperatorInput, UserUncheckedCreateWithoutOperatorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOperatorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOperatorInput, UserUncheckedUpdateWithoutOperatorInput>
  }

  export type UserUpdateWithoutOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUpdateOneWithoutUserNestedInput
    properti?: PropertiUpdateManyWithoutAdminNestedInput
    settings?: AdminSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    no_telepon?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUncheckedUpdateOneWithoutUserNestedInput
    properti?: PropertiUncheckedUpdateManyWithoutAdminNestedInput
    settings?: AdminSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PropertiUpsertWithoutOperatorInput = {
    update: XOR<PropertiUpdateWithoutOperatorInput, PropertiUncheckedUpdateWithoutOperatorInput>
    create: XOR<PropertiCreateWithoutOperatorInput, PropertiUncheckedCreateWithoutOperatorInput>
    where?: PropertiWhereInput
  }

  export type PropertiUpdateToOneWithWhereWithoutOperatorInput = {
    where?: PropertiWhereInput
    data: XOR<PropertiUpdateWithoutOperatorInput, PropertiUncheckedUpdateWithoutOperatorInput>
  }

  export type PropertiUpdateWithoutOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutPropertiNestedInput
    kamar?: KamarUpdateManyWithoutPropertiNestedInput
    komplain?: KomplainUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUpdateManyWithoutPropertiNestedInput
  }

  export type PropertiUncheckedUpdateWithoutOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: StringFieldUpdateOperationsInput | string
    kamar?: KamarUncheckedUpdateManyWithoutPropertiNestedInput
    komplain?: KomplainUncheckedUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUncheckedUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUncheckedUpdateManyWithoutPropertiNestedInput
  }

  export type PengajuanDanaUpsertWithWhereUniqueWithoutOperatorInput = {
    where: PengajuanDanaWhereUniqueInput
    update: XOR<PengajuanDanaUpdateWithoutOperatorInput, PengajuanDanaUncheckedUpdateWithoutOperatorInput>
    create: XOR<PengajuanDanaCreateWithoutOperatorInput, PengajuanDanaUncheckedCreateWithoutOperatorInput>
  }

  export type PengajuanDanaUpdateWithWhereUniqueWithoutOperatorInput = {
    where: PengajuanDanaWhereUniqueInput
    data: XOR<PengajuanDanaUpdateWithoutOperatorInput, PengajuanDanaUncheckedUpdateWithoutOperatorInput>
  }

  export type PengajuanDanaUpdateManyWithWhereWithoutOperatorInput = {
    where: PengajuanDanaScalarWhereInput
    data: XOR<PengajuanDanaUpdateManyMutationInput, PengajuanDanaUncheckedUpdateManyWithoutOperatorInput>
  }

  export type PenghuniCreateWithoutKomplainInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutPenghuniInput
    kamar?: KamarCreateNestedOneWithoutPenghuniInput
    pemesanan?: PemesananCreateNestedManyWithoutPenghuniInput
  }

  export type PenghuniUncheckedCreateWithoutKomplainInput = {
    id?: string
    tgl_mulai: Date | string
    tgl_berakhir?: Date | string | null
    status_sewa?: $Enums.StatusSewa
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    kamar_id?: string | null
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutPenghuniInput
  }

  export type PenghuniCreateOrConnectWithoutKomplainInput = {
    where: PenghuniWhereUniqueInput
    create: XOR<PenghuniCreateWithoutKomplainInput, PenghuniUncheckedCreateWithoutKomplainInput>
  }

  export type PropertiCreateWithoutKomplainInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin: UserCreateNestedOneWithoutPropertiInput
    kamar?: KamarCreateNestedManyWithoutPropertiInput
    operator?: OperatorCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaCreateNestedManyWithoutPropertiInput
  }

  export type PropertiUncheckedCreateWithoutKomplainInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin_id: string
    kamar?: KamarUncheckedCreateNestedManyWithoutPropertiInput
    operator?: OperatorUncheckedCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutPropertiInput
    pengajuanDana?: PengajuanDanaUncheckedCreateNestedManyWithoutPropertiInput
  }

  export type PropertiCreateOrConnectWithoutKomplainInput = {
    where: PropertiWhereUniqueInput
    create: XOR<PropertiCreateWithoutKomplainInput, PropertiUncheckedCreateWithoutKomplainInput>
  }

  export type PenghuniUpsertWithoutKomplainInput = {
    update: XOR<PenghuniUpdateWithoutKomplainInput, PenghuniUncheckedUpdateWithoutKomplainInput>
    create: XOR<PenghuniCreateWithoutKomplainInput, PenghuniUncheckedCreateWithoutKomplainInput>
    where?: PenghuniWhereInput
  }

  export type PenghuniUpdateToOneWithWhereWithoutKomplainInput = {
    where?: PenghuniWhereInput
    data: XOR<PenghuniUpdateWithoutKomplainInput, PenghuniUncheckedUpdateWithoutKomplainInput>
  }

  export type PenghuniUpdateWithoutKomplainInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPenghuniNestedInput
    kamar?: KamarUpdateOneWithoutPenghuniNestedInput
    pemesanan?: PemesananUpdateManyWithoutPenghuniNestedInput
  }

  export type PenghuniUncheckedUpdateWithoutKomplainInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgl_mulai?: DateTimeFieldUpdateOperationsInput | Date | string
    tgl_berakhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_sewa?: EnumStatusSewaFieldUpdateOperationsInput | $Enums.StatusSewa
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    kamar_id?: NullableStringFieldUpdateOperationsInput | string | null
    pemesanan?: PemesananUncheckedUpdateManyWithoutPenghuniNestedInput
  }

  export type PropertiUpsertWithoutKomplainInput = {
    update: XOR<PropertiUpdateWithoutKomplainInput, PropertiUncheckedUpdateWithoutKomplainInput>
    create: XOR<PropertiCreateWithoutKomplainInput, PropertiUncheckedCreateWithoutKomplainInput>
    where?: PropertiWhereInput
  }

  export type PropertiUpdateToOneWithWhereWithoutKomplainInput = {
    where?: PropertiWhereInput
    data: XOR<PropertiUpdateWithoutKomplainInput, PropertiUncheckedUpdateWithoutKomplainInput>
  }

  export type PropertiUpdateWithoutKomplainInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutPropertiNestedInput
    kamar?: KamarUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUpdateManyWithoutPropertiNestedInput
  }

  export type PropertiUncheckedUpdateWithoutKomplainInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: StringFieldUpdateOperationsInput | string
    kamar?: KamarUncheckedUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUncheckedUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUncheckedUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUncheckedUpdateManyWithoutPropertiNestedInput
  }

  export type OperatorCreateWithoutPengajuanDanaInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutOperatorInput
    properti: PropertiCreateNestedOneWithoutOperatorInput
  }

  export type OperatorUncheckedCreateWithoutPengajuanDanaInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    properti_id: string
  }

  export type OperatorCreateOrConnectWithoutPengajuanDanaInput = {
    where: OperatorWhereUniqueInput
    create: XOR<OperatorCreateWithoutPengajuanDanaInput, OperatorUncheckedCreateWithoutPengajuanDanaInput>
  }

  export type PropertiCreateWithoutPengajuanDanaInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin: UserCreateNestedOneWithoutPropertiInput
    kamar?: KamarCreateNestedManyWithoutPropertiInput
    komplain?: KomplainCreateNestedManyWithoutPropertiInput
    operator?: OperatorCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananCreateNestedManyWithoutPropertiInput
  }

  export type PropertiUncheckedCreateWithoutPengajuanDanaInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    admin_id: string
    kamar?: KamarUncheckedCreateNestedManyWithoutPropertiInput
    komplain?: KomplainUncheckedCreateNestedManyWithoutPropertiInput
    operator?: OperatorUncheckedCreateNestedManyWithoutPropertiInput
    pemesanan?: PemesananUncheckedCreateNestedManyWithoutPropertiInput
  }

  export type PropertiCreateOrConnectWithoutPengajuanDanaInput = {
    where: PropertiWhereUniqueInput
    create: XOR<PropertiCreateWithoutPengajuanDanaInput, PropertiUncheckedCreateWithoutPengajuanDanaInput>
  }

  export type OperatorUpsertWithoutPengajuanDanaInput = {
    update: XOR<OperatorUpdateWithoutPengajuanDanaInput, OperatorUncheckedUpdateWithoutPengajuanDanaInput>
    create: XOR<OperatorCreateWithoutPengajuanDanaInput, OperatorUncheckedCreateWithoutPengajuanDanaInput>
    where?: OperatorWhereInput
  }

  export type OperatorUpdateToOneWithWhereWithoutPengajuanDanaInput = {
    where?: OperatorWhereInput
    data: XOR<OperatorUpdateWithoutPengajuanDanaInput, OperatorUncheckedUpdateWithoutPengajuanDanaInput>
  }

  export type OperatorUpdateWithoutPengajuanDanaInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOperatorNestedInput
    properti?: PropertiUpdateOneRequiredWithoutOperatorNestedInput
  }

  export type OperatorUncheckedUpdateWithoutPengajuanDanaInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type PropertiUpsertWithoutPengajuanDanaInput = {
    update: XOR<PropertiUpdateWithoutPengajuanDanaInput, PropertiUncheckedUpdateWithoutPengajuanDanaInput>
    create: XOR<PropertiCreateWithoutPengajuanDanaInput, PropertiUncheckedCreateWithoutPengajuanDanaInput>
    where?: PropertiWhereInput
  }

  export type PropertiUpdateToOneWithWhereWithoutPengajuanDanaInput = {
    where?: PropertiWhereInput
    data: XOR<PropertiUpdateWithoutPengajuanDanaInput, PropertiUncheckedUpdateWithoutPengajuanDanaInput>
  }

  export type PropertiUpdateWithoutPengajuanDanaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutPropertiNestedInput
    kamar?: KamarUpdateManyWithoutPropertiNestedInput
    komplain?: KomplainUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUpdateManyWithoutPropertiNestedInput
  }

  export type PropertiUncheckedUpdateWithoutPengajuanDanaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: StringFieldUpdateOperationsInput | string
    kamar?: KamarUncheckedUpdateManyWithoutPropertiNestedInput
    komplain?: KomplainUncheckedUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUncheckedUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUncheckedUpdateManyWithoutPropertiNestedInput
  }

  export type PropertiCreateManyAdminInput = {
    id?: string
    nama: string
    alamat: string
    jenis?: $Enums.JenisProperti | null
    deskripsi?: string | null
    kebijakan?: string | null
    gambar?: PropertiCreategambarInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PropertiUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar?: KamarUpdateManyWithoutPropertiNestedInput
    komplain?: KomplainUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUpdateManyWithoutPropertiNestedInput
  }

  export type PropertiUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar?: KamarUncheckedUpdateManyWithoutPropertiNestedInput
    komplain?: KomplainUncheckedUpdateManyWithoutPropertiNestedInput
    operator?: OperatorUncheckedUpdateManyWithoutPropertiNestedInput
    pemesanan?: PemesananUncheckedUpdateManyWithoutPropertiNestedInput
    pengajuanDana?: PengajuanDanaUncheckedUpdateManyWithoutPropertiNestedInput
  }

  export type PropertiUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenis?: NullableEnumJenisPropertiFieldUpdateOperationsInput | $Enums.JenisProperti | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    kebijakan?: NullableStringFieldUpdateOperationsInput | string | null
    gambar?: PropertiUpdategambarInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KamarCreateManyPropertiInput = {
    id?: string
    nomor: string
    tipe?: $Enums.TipeKamar
    luas?: string | null
    fasilitas?: KamarCreatefasilitasInput | string[]
    deskripsi?: string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarCreategambarInput | string[]
    status?: $Enums.StatusKamar
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type KomplainCreateManyPropertiInput = {
    id?: string
    masalah: string
    jenis: $Enums.JenisKomplain
    deskripsi: string
    foto?: string | null
    status?: $Enums.StatusKomplain
    created_at?: Date | string
    updated_at?: Date | string
    penghuni_id: string
  }

  export type OperatorCreateManyPropertiInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
  }

  export type PemesananCreateManyPropertiInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar_id: string
    penghuni_id: string
  }

  export type PengajuanDanaCreateManyPropertiInput = {
    id?: string
    tujuan: string
    jumlah: number
    no_rekening: string
    foto?: string | null
    status?: $Enums.StatusDana
    created_at?: Date | string
    updated_at?: Date | string
    operator_id: string
  }

  export type KamarUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    pemesanan?: PemesananUpdateManyWithoutKamarNestedInput
    penghuni?: PenghuniUpdateOneWithoutKamarNestedInput
  }

  export type KamarUncheckedUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    pemesanan?: PemesananUncheckedUpdateManyWithoutKamarNestedInput
    penghuni?: PenghuniUncheckedUpdateOneWithoutKamarNestedInput
  }

  export type KamarUncheckedUpdateManyWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeKamarFieldUpdateOperationsInput | $Enums.TipeKamar
    luas?: NullableStringFieldUpdateOperationsInput | string | null
    fasilitas?: KamarUpdatefasilitasInput | string[]
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tarif?: NullableJsonNullValueInput | InputJsonValue
    gambar?: KamarUpdategambarInput | string[]
    status?: EnumStatusKamarFieldUpdateOperationsInput | $Enums.StatusKamar
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KomplainUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    masalah?: StringFieldUpdateOperationsInput | string
    jenis?: EnumJenisKomplainFieldUpdateOperationsInput | $Enums.JenisKomplain
    deskripsi?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKomplainFieldUpdateOperationsInput | $Enums.StatusKomplain
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUpdateOneRequiredWithoutKomplainNestedInput
  }

  export type KomplainUncheckedUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    masalah?: StringFieldUpdateOperationsInput | string
    jenis?: EnumJenisKomplainFieldUpdateOperationsInput | $Enums.JenisKomplain
    deskripsi?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKomplainFieldUpdateOperationsInput | $Enums.StatusKomplain
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
  }

  export type KomplainUncheckedUpdateManyWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    masalah?: StringFieldUpdateOperationsInput | string
    jenis?: EnumJenisKomplainFieldUpdateOperationsInput | $Enums.JenisKomplain
    deskripsi?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKomplainFieldUpdateOperationsInput | $Enums.StatusKomplain
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
  }

  export type OperatorUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOperatorNestedInput
    pengajuanDana?: PengajuanDanaUpdateManyWithoutOperatorNestedInput
  }

  export type OperatorUncheckedUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    pengajuanDana?: PengajuanDanaUncheckedUpdateManyWithoutOperatorNestedInput
  }

  export type OperatorUncheckedUpdateManyWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type PemesananUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar?: KamarUpdateOneRequiredWithoutPemesananNestedInput
    penghuni?: PenghuniUpdateOneRequiredWithoutPemesananNestedInput
    pembayaran?: PembayaranUpdateOneWithoutPemesananNestedInput
  }

  export type PemesananUncheckedUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar_id?: StringFieldUpdateOperationsInput | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
    pembayaran?: PembayaranUncheckedUpdateOneWithoutPemesananNestedInput
  }

  export type PemesananUncheckedUpdateManyWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar_id?: StringFieldUpdateOperationsInput | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
  }

  export type PengajuanDanaUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    tujuan?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    no_rekening?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusDanaFieldUpdateOperationsInput | $Enums.StatusDana
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operator?: OperatorUpdateOneRequiredWithoutPengajuanDanaNestedInput
  }

  export type PengajuanDanaUncheckedUpdateWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    tujuan?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    no_rekening?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusDanaFieldUpdateOperationsInput | $Enums.StatusDana
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operator_id?: StringFieldUpdateOperationsInput | string
  }

  export type PengajuanDanaUncheckedUpdateManyWithoutPropertiInput = {
    id?: StringFieldUpdateOperationsInput | string
    tujuan?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    no_rekening?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusDanaFieldUpdateOperationsInput | $Enums.StatusDana
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operator_id?: StringFieldUpdateOperationsInput | string
  }

  export type PemesananCreateManyKamarInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    penghuni_id: string
    properti_id: string
  }

  export type PemesananUpdateWithoutKamarInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni?: PenghuniUpdateOneRequiredWithoutPemesananNestedInput
    properti?: PropertiUpdateOneRequiredWithoutPemesananNestedInput
    pembayaran?: PembayaranUpdateOneWithoutPemesananNestedInput
  }

  export type PemesananUncheckedUpdateWithoutKamarInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
    pembayaran?: PembayaranUncheckedUpdateOneWithoutPemesananNestedInput
  }

  export type PemesananUncheckedUpdateManyWithoutKamarInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    penghuni_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type PemesananCreateManyPenghuniInput = {
    id?: string
    durasi_sewa: number
    tgl_masuk: Date | string
    metode_bayar: string
    total_bayar: number
    status?: $Enums.StatusPemesanan
    created_at?: Date | string
    updated_at?: Date | string
    kamar_id: string
    properti_id: string
  }

  export type KomplainCreateManyPenghuniInput = {
    id?: string
    masalah: string
    jenis: $Enums.JenisKomplain
    deskripsi: string
    foto?: string | null
    status?: $Enums.StatusKomplain
    created_at?: Date | string
    updated_at?: Date | string
    properti_id: string
  }

  export type PemesananUpdateWithoutPenghuniInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar?: KamarUpdateOneRequiredWithoutPemesananNestedInput
    properti?: PropertiUpdateOneRequiredWithoutPemesananNestedInput
    pembayaran?: PembayaranUpdateOneWithoutPemesananNestedInput
  }

  export type PemesananUncheckedUpdateWithoutPenghuniInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
    pembayaran?: PembayaranUncheckedUpdateOneWithoutPemesananNestedInput
  }

  export type PemesananUncheckedUpdateManyWithoutPenghuniInput = {
    id?: StringFieldUpdateOperationsInput | string
    durasi_sewa?: IntFieldUpdateOperationsInput | number
    tgl_masuk?: DateTimeFieldUpdateOperationsInput | Date | string
    metode_bayar?: StringFieldUpdateOperationsInput | string
    total_bayar?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPemesananFieldUpdateOperationsInput | $Enums.StatusPemesanan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kamar_id?: StringFieldUpdateOperationsInput | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type KomplainUpdateWithoutPenghuniInput = {
    id?: StringFieldUpdateOperationsInput | string
    masalah?: StringFieldUpdateOperationsInput | string
    jenis?: EnumJenisKomplainFieldUpdateOperationsInput | $Enums.JenisKomplain
    deskripsi?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKomplainFieldUpdateOperationsInput | $Enums.StatusKomplain
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti?: PropertiUpdateOneRequiredWithoutKomplainNestedInput
  }

  export type KomplainUncheckedUpdateWithoutPenghuniInput = {
    id?: StringFieldUpdateOperationsInput | string
    masalah?: StringFieldUpdateOperationsInput | string
    jenis?: EnumJenisKomplainFieldUpdateOperationsInput | $Enums.JenisKomplain
    deskripsi?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKomplainFieldUpdateOperationsInput | $Enums.StatusKomplain
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type KomplainUncheckedUpdateManyWithoutPenghuniInput = {
    id?: StringFieldUpdateOperationsInput | string
    masalah?: StringFieldUpdateOperationsInput | string
    jenis?: EnumJenisKomplainFieldUpdateOperationsInput | $Enums.JenisKomplain
    deskripsi?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKomplainFieldUpdateOperationsInput | $Enums.StatusKomplain
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type PengajuanDanaCreateManyOperatorInput = {
    id?: string
    tujuan: string
    jumlah: number
    no_rekening: string
    foto?: string | null
    status?: $Enums.StatusDana
    created_at?: Date | string
    updated_at?: Date | string
    properti_id: string
  }

  export type PengajuanDanaUpdateWithoutOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    tujuan?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    no_rekening?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusDanaFieldUpdateOperationsInput | $Enums.StatusDana
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti?: PropertiUpdateOneRequiredWithoutPengajuanDanaNestedInput
  }

  export type PengajuanDanaUncheckedUpdateWithoutOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    tujuan?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    no_rekening?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusDanaFieldUpdateOperationsInput | $Enums.StatusDana
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti_id?: StringFieldUpdateOperationsInput | string
  }

  export type PengajuanDanaUncheckedUpdateManyWithoutOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    tujuan?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    no_rekening?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusDanaFieldUpdateOperationsInput | $Enums.StatusDana
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properti_id?: StringFieldUpdateOperationsInput | string
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
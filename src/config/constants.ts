import { diskStorage } from 'multer';
import { extname } from 'path';
import * as uuid from 'uuid';

export type Uploads = 'images' | 'pdfs' | 'xlsx' | 'sdks';

export enum UploadsEnum {
  images = 'images',
  pdfs = 'pdfs',
  xlsx = 'xlsx',
  sdks = 'sdks',
}

export enum enumDatabases {
  Unique = 'MONGO_CONNECTION',
}

export function translate(
  message: string,
  lang: string = process.env.LANG_DEFAULT,
) {
  // console.log(message);
  return i18n.__(
    {
      locale: lang,
      phrase: message,
    },
    message,
  );
}

export enum modelsMongo {
  Testing = 'TEST_MODEL',
}

/**
 * Generates storage multer
 * @param [type] url file type
 * @param [maxSize] file size in megabites
 * @returns  config to disk storage
 */
export const generateStorageMulter = (
  type: Uploads = 'images',
  maxSize: number = 3,
) => ({
  storage: diskStorage({
    destination: `./public/uploads/${type}`,
    filename: (req, file, cb) => {
      return cb(null, `${uuid.v4()}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: maxSize * 1024 * 1024,
  },
});
/**
 * Generates password
 * @param size
 * @returns password
 */
export const HeadersGlobals: any = [
  {
    name: 'accept-language',
    description:
      'Serves for internationalization "pt" = portugues, "es"= "Español", "en"= Ingles ',
    required: false,
  },
];

export function generatePassword(size: number): string {
  let chars = 'abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789';
  let password = '';
  for (let i = 0; i < size; i++)
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  return password;
}

/**
 * Methods
 */
export enum Methods {
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
  POST = 'POST',
  PATCH = 'PATCH',
}

export const ROLES = [
  {
    id: 1,
    name: 'Super Administrador',
  },
];
export const USERS = [
  {
    id: 1,
    name: 'admin',
    user: 'adminMaster',
    email: 'miguel.moralesr@hotmail.com',
    password: 'admin123',
    lastName: 'admin',
    secondLastName: 'admin',
    firstLogin: true,
    rolId: 1,
    active: true,
  },
];

export const MODULES: Array<any> = [
  {
    id: 1,
    name: 'names.modules.security',
    keyName: 'security',
    icon: 'supervisor_account',
    description: 'Security administration',
  },
  {
    id: 2,
    name: 'names.modules.inventory',
    keyName: 'inventory',
    icon: 'supervised_user_circle',
    description: 'Inventory administration',
  },
];

export const ACCESSES: Array<any> = [
  {
    id: 1,
    name: 'names.accesses.users',
    keyName: 'users',
    icon: 'people',
    description: 'Users administration',
    moduleId: 1,
  },
  {
    id: 2,
    name: 'names.accesses.roles',
    keyName: 'roles',
    description: 'Roles administration',
    icon: 'person_add',
    moduleId: 1,
  },
  {
    id: 3,
    name: 'names.accesses.categories',
    keyName: 'categories',
    description: 'Categories administration',
    icon: 'star',
    moduleId: 2,
  },
  {
    id: 4,
    name: 'names.accesses.subcategories',
    keyName: 'subcategories',
    description: 'Subcategories administration',
    icon: 'star_border',
    moduleId: 2,
  },
  {
    id: 5,
    name: 'names.accesses.products',
    keyName: 'products',
    description: 'Products administration',
    icon: 'cake',
    moduleId: 2,
  },
];

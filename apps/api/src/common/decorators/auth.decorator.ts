import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY, ROLES_KEY, PERMISSIONS_KEY } from '../constants';
import { RoleType, PermissionType } from '@kajlagbe/types';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);

export const Permissions = (...permissions: PermissionType[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);


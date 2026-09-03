import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants';
import { RoleType } from '@kajlagbe/types';

export const Roles = (...roles: (RoleType | string)[]) => SetMetadata(ROLES_KEY, roles);


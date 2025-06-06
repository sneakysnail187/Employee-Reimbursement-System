/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedImport } from './routes/_protected'
import { Route as AuthImport } from './routes/_auth'
import { Route as ProtectedUserAllUsersImport } from './routes/_protected/user/allUsers'
import { Route as ProtectedTicketsUserTicketsImport } from './routes/_protected/tickets/userTickets'
import { Route as ProtectedTicketsAllTicketsImport } from './routes/_protected/tickets/allTickets'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const AuthAuthRegisterLazyImport = createFileRoute('/_auth/auth/register')()

// Create/Update Routes

const ProtectedRoute = ProtectedImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthAuthRegisterLazyRoute = AuthAuthRegisterLazyImport.update({
  id: '/auth/register',
  path: '/auth/register',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/auth/register.lazy').then((d) => d.Route),
)

const ProtectedUserAllUsersRoute = ProtectedUserAllUsersImport.update({
  id: '/user/allUsers',
  path: '/user/allUsers',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedTicketsUserTicketsRoute =
  ProtectedTicketsUserTicketsImport.update({
    id: '/tickets/userTickets',
    path: '/tickets/userTickets',
    getParentRoute: () => ProtectedRoute,
  } as any)

const ProtectedTicketsAllTicketsRoute = ProtectedTicketsAllTicketsImport.update(
  {
    id: '/tickets/allTickets',
    path: '/tickets/allTickets',
    getParentRoute: () => ProtectedRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    '/_protected/tickets/allTickets': {
      id: '/_protected/tickets/allTickets'
      path: '/tickets/allTickets'
      fullPath: '/tickets/allTickets'
      preLoaderRoute: typeof ProtectedTicketsAllTicketsImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/tickets/userTickets': {
      id: '/_protected/tickets/userTickets'
      path: '/tickets/userTickets'
      fullPath: '/tickets/userTickets'
      preLoaderRoute: typeof ProtectedTicketsUserTicketsImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/user/allUsers': {
      id: '/_protected/user/allUsers'
      path: '/user/allUsers'
      fullPath: '/user/allUsers'
      preLoaderRoute: typeof ProtectedUserAllUsersImport
      parentRoute: typeof ProtectedImport
    }
    '/_auth/auth/register': {
      id: '/_auth/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthAuthRegisterLazyImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthAuthRegisterLazyRoute: typeof AuthAuthRegisterLazyRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAuthRegisterLazyRoute: AuthAuthRegisterLazyRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface ProtectedRouteChildren {
  ProtectedTicketsAllTicketsRoute: typeof ProtectedTicketsAllTicketsRoute
  ProtectedTicketsUserTicketsRoute: typeof ProtectedTicketsUserTicketsRoute
  ProtectedUserAllUsersRoute: typeof ProtectedUserAllUsersRoute
}

const ProtectedRouteChildren: ProtectedRouteChildren = {
  ProtectedTicketsAllTicketsRoute: ProtectedTicketsAllTicketsRoute,
  ProtectedTicketsUserTicketsRoute: ProtectedTicketsUserTicketsRoute,
  ProtectedUserAllUsersRoute: ProtectedUserAllUsersRoute,
}

const ProtectedRouteWithChildren = ProtectedRoute._addFileChildren(
  ProtectedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '': typeof ProtectedRouteWithChildren
  '/tickets/allTickets': typeof ProtectedTicketsAllTicketsRoute
  '/tickets/userTickets': typeof ProtectedTicketsUserTicketsRoute
  '/user/allUsers': typeof ProtectedUserAllUsersRoute
  '/auth/register': typeof AuthAuthRegisterLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '': typeof ProtectedRouteWithChildren
  '/tickets/allTickets': typeof ProtectedTicketsAllTicketsRoute
  '/tickets/userTickets': typeof ProtectedTicketsUserTicketsRoute
  '/user/allUsers': typeof ProtectedUserAllUsersRoute
  '/auth/register': typeof AuthAuthRegisterLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_protected': typeof ProtectedRouteWithChildren
  '/_protected/tickets/allTickets': typeof ProtectedTicketsAllTicketsRoute
  '/_protected/tickets/userTickets': typeof ProtectedTicketsUserTicketsRoute
  '/_protected/user/allUsers': typeof ProtectedUserAllUsersRoute
  '/_auth/auth/register': typeof AuthAuthRegisterLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/tickets/allTickets'
    | '/tickets/userTickets'
    | '/user/allUsers'
    | '/auth/register'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/tickets/allTickets'
    | '/tickets/userTickets'
    | '/user/allUsers'
    | '/auth/register'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_protected'
    | '/_protected/tickets/allTickets'
    | '/_protected/tickets/userTickets'
    | '/_protected/user/allUsers'
    | '/_auth/auth/register'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AuthRoute: typeof AuthRouteWithChildren
  ProtectedRoute: typeof ProtectedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AuthRoute: AuthRouteWithChildren,
  ProtectedRoute: ProtectedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/_protected"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/auth/register"
      ]
    },
    "/_protected": {
      "filePath": "_protected.tsx",
      "children": [
        "/_protected/tickets/allTickets",
        "/_protected/tickets/userTickets",
        "/_protected/user/allUsers"
      ]
    },
    "/_protected/tickets/allTickets": {
      "filePath": "_protected/tickets/allTickets.tsx",
      "parent": "/_protected"
    },
    "/_protected/tickets/userTickets": {
      "filePath": "_protected/tickets/userTickets.tsx",
      "parent": "/_protected"
    },
    "/_protected/user/allUsers": {
      "filePath": "_protected/user/allUsers.tsx",
      "parent": "/_protected"
    },
    "/_auth/auth/register": {
      "filePath": "_auth/auth/register.lazy.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */

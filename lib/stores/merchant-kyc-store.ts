import { create } from 'zustand';

interface MerchantKycStore {
  documentPaths: {
    cacDocumentPath?: string | null;
    tinPath?: string | null;
    reqCertificatePath?: string | null;
    menuPath?: string | null;
  };
  setCacDocumentPath: (path: string | null) => void;
  setTinPath: (path: string | null) => void;
  setReqCertificatePath: (path: string | null) => void;
  setMenuPath: (path: string | null) => void;
  clearAllPaths: () => void;
  getDocumentPath: (documentType: 'CAC' | 'TIN' | 'TAX' | 'NIN') => string | null | undefined;
}

export const useMerchantKycStore = create<MerchantKycStore>((set, get) => ({
  documentPaths: {
    cacDocumentPath: null,
    tinPath: null,
    reqCertificatePath: null,
    menuPath: null,
  },
  setCacDocumentPath: (path: string | null) =>
    set((state) => ({
      documentPaths: {
        ...state.documentPaths,
        cacDocumentPath: path,
      },
    })),
  setTinPath: (path: string | null) =>
    set((state) => ({
      documentPaths: {
        ...state.documentPaths,
        tinPath: path,
      },
    })),
  setReqCertificatePath: (path: string | null) =>
    set((state) => ({
      documentPaths: {
        ...state.documentPaths,
        reqCertificatePath: path,
      },
    })),
  setMenuPath: (path: string | null) =>
    set((state) => ({
      documentPaths: {
        ...state.documentPaths,
        menuPath: path,
      },
    })),
  clearAllPaths: () =>
    set({
      documentPaths: {
        cacDocumentPath: null,
        tinPath: null,
        reqCertificatePath: null,
        menuPath: null,
      },
    }),
  getDocumentPath: (documentType: 'CAC' | 'TIN' | 'TAX' | 'NIN') => {
    const state = get();
    switch (documentType) {
      case 'CAC':
        return state.documentPaths.cacDocumentPath;
      case 'TIN':
        return state.documentPaths.tinPath;
      case 'TAX':
        return state.documentPaths.reqCertificatePath;
      case 'NIN':
        return state.documentPaths.menuPath;
      default:
        return null;
    }
  },
}));


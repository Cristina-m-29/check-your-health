export interface Menu {
  userType?: string;
  menuList: string[];
  translateMenuList: string[];
}

export const menus: Menu[] = [
  {
    userType: 'patient',
    menuList: ['home', 'references', 'prescriptions', 'profile'],
    translateMenuList: [ 'acasă', 'bilete de trimitere', 'rețete', 'profil']
  },
  {
    userType: 'medic',
    menuList: ['home', 'patients', 'profile'],
    translateMenuList: ['acasă', 'pacienti', 'profil']
  },
  {
    userType: 'pharmacy',
    menuList: ['home', 'prescriptions-history', 'profile'],
    translateMenuList: ['acasă', 'istoric rețete', 'profil']
  },
  {
    userType: 'specialist',
    menuList: ['home', 'profile'],
    translateMenuList: ['acasă', 'profil']
  }
];

export const options: Menu = {
  menuList: ['notificari', 'iesire'],
  translateMenuList: ['notificări', 'ieșire']
};

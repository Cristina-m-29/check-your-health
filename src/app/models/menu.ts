export interface Menu {
  userType?: string;
  menuList: string[];
  translateMenuList: string[];
}

export const menus: Menu[] = [
  {
    userType: 'patient',
    menuList: ['home', 'prescriptii', 'cont'],
    translateMenuList: [ 'acasă', 'prescripții', 'profil']
  },
  {
    userType: 'medic',
    menuList: [''],
    translateMenuList: ['']
  },
  {
    userType: 'pharmacy',
    menuList: [''],
    translateMenuList: ['']
  },
  {
    userType: 'specialist',
    menuList: [''],
    translateMenuList: ['']
  }
];

export const options: Menu = {
  menuList: ['notificari', 'iesire'],
  translateMenuList: ['notificări', 'ieșire']
};

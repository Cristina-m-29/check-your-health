export interface Menu {
  userType?: string;
  menuList: string[];
  translateMenuList: string[];
}

export const menus: Menu[] = [
  {
    userType: 'pacient',
    menuList: ['diagnostice', 'prescriptii', 'medic'],
    translateMenuList: ['diagnostice', 'prescripții', 'medic']
  },
  {
    userType: 'medic',
    menuList: [''],
    translateMenuList: ['']
  },
  {
    userType: 'farmacy',
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
  menuList: ['notificari', 'cont', 'iesire'],
  translateMenuList: ['notificări', 'cont', 'ieșire']
};

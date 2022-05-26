export class Medicine {
  id: string = '';
  name: string = '';
}

export class PrescribedMedicine { 
  medicine = new Medicine();
  quantity: number = 0;
}
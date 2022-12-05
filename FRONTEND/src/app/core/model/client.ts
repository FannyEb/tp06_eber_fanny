export class Client{
    id: number = 0;
    firstName: string = '';
    lastName: string= '';
    email: string= '';
    phone: string= '';
    address: string= '';
    city: string= '';
    codeCity: string= '';
    country: string= '';
    login: string= '';
    password: string= '';
    confirmPassword: string= '';
    civility: string= '';

    isAllCompleted(): boolean {
        return this.firstName != '' &&
            this.lastName != '' &&
            this.email != '' &&
            this.phone != '' &&
            this.address != '' && 
            this.city != '' &&
            this.civility != '' &&
            this.codeCity != '' &&
            this.country != '' &&
            this.login != '' &&
            this.password != '' &&
            this.confirmPassword != ''
    }

    isPasswordConfirm(): boolean {
        return this.password == this.confirmPassword
    }
}
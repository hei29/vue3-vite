class PersonY {
    age: number;
    height: number;
    name: string;
    // 在构造函数的参数上使用public等同于创建了同名的成员变量。
    constructor(height:number, name:string) {
        this.height = height
        this.age = 18
        this.name = name
    }
}
const person = new PersonY(178, 'xcy')
console.log(person)

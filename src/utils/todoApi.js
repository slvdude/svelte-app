export default class TodoApi {
    static async getAll() {
        //const response = await fetch('http://localhost:3000/posts');
        return JSON.parse(localStorage.getItem("todo-list") || "[]");
        //console.log(response.json());
    }

    static async save(items) {
        localStorage.setItem("todo-list", JSON.stringify(items));
    }
}
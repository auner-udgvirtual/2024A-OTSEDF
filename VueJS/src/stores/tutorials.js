import { defineStore } from 'pinia'

export const useCrudStore = defineStore('crud', {
    state: () => ({
        items: [
            { id: "6n043dhow", title: "Initial Tutorial", description: "Alfa Tutorial", published: false },
            { id: "klwpgjy2a", title: "vamos viendo otro", description: "porque no", published: false }
        ],
    }),
    actions: {
        // Función para agregar un nuevo elemento
        addItem(item) {
            this.items.push(item)
        },
        // Función para actualizar un elemento
        updateItem(updatedItem) {
            const index = this.items.findIndex(item => item.id === updatedItem.id)
            if (index !== -1) {
                this.items[index] = updatedItem
            }
        },
        // Función para eliminar un elemento
        removeItem(itemId) {
            this.items = this.items.filter(item => item.id !== itemId)
        },
        // Function para eliminar todos los elementos
        removeAllItems() {
            this.items = [];
        },
        // Function para buscar por título
        searchByTitle(title) {
            return this.items.filter(item => item.title.toLowerCase().includes(title.toLowerCase()))
        },
        // Function para obtener un elemento por ID
        getItemById(id) {
            return this.items.find(item => item.id === id)
        },
    },
    getters: {
        // Getter para obtener todos los elementos
        getAllItems() {
            return this.items
        },

    },
})

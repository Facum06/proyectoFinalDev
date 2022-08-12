class ContenedorMemoria {
    constructor() {
      this.data = [];
    }
  
    getAll() {
      return [...this.data];
    }
  
    getById(id) {
      const itemFound = this.data.find((item) => item.id === Number(id));
      if (itemFound == undefined) {
        throw new Error("No se encontro "+id);
      } else {
        return itemFound;
      }
    }
  
    addItem(object) {
      this.data.push(object);
      return [...this.data];
    }
  
    editById(object) {
      this.data = this.data.map((item) =>
        item.id !== object.id ? item : object
      );
      return [...this.data];
    }
  
    deleteById(id) {
      const filteredItemList = this.data.filter(
        (item) => item.id !== Number(id)
      );
      if (JSON.stringify(this.data) === JSON.stringify(filteredItemList)) {
        return false;
      } else {
        this.data = filteredItemList;
        return true;
      }
    }
  
    deleteAll() {
      this.data = [];
    }
  
    addItemInto(containerId, object) {
      let itemFound = this.data.find(
        (item) => item.id === Number(containerId)
      );
      itemFound.productos.push(object);
      this.data = this.data.map((item) =>
        item.id !== itemFound.id ? item : itemFound
      );
    }
  
    removeItemFrom(containerId, objectId) {
      let itemFound = this.data.find(
        (item) => item.id === Number(containerId)
      );
      itemFound.productos = itemFound.productos.filter(
        (item) => item.id !== Number(objectId)
      );
      this.data = this.data.map((item) =>
        item.id !== itemFound.id ? item : itemFound
      );
    }
  
    emptyContainer(containerId) {
      let itemFound = this.data.find(
        (item) => item.id === Number(containerId)
      );
      itemFound.productos = [];
      this.data = this.data.map((item) =>
        item.id !== itemFound.id ? item : itemFound
      );
    }
  }
  
  export default ContenedorMemoria;
  
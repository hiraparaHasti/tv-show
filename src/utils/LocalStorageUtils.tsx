
// LocalStorage Data

export const setDataToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getDataFromLocalStorage = (key: string) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  };
  
  export const deleteDataFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  
let admin = true;

const userCheck = {
    adminCheq: () =>{
        if (admin == true) {
            return true;
        } else {
            console.log("NO AUTORIZADO")
            return false;            
        }
    },
};

export default userCheck;
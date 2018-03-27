class test {
    state = {
        a:1
    }
    get = ()=>{
        return 1
    }
    set = (a) => {
        thie.state.a = a
    }
}

const Test = new test;

Test.get() // 1

Test.state.a // 1

Test.set(2)
Test.state.a // 2

function aaa (a:Test):number => {

    return "sss";
}

interface Test {
    id:string,
    sss:number
}

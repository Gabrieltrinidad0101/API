const wait = (time: number) => new Promise((res,rej)=> setTimeout(res,time))

export default wait;
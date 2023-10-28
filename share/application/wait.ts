const wait = async (time: number): Promise<void> => { await new Promise((resolve, reject) => setTimeout(resolve, time)) }

export default wait

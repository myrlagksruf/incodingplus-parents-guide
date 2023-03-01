
const projectId = import.meta.env.VITE_PROJECT ?? process.env.VITE_PROJECT;
const auth = import.meta.env.VITE_PARENT ?? process.env.VITE_PARENT

export const getProject = async () => {
    try{
        const res = await fetch(`https://vercel.com/api/v6/deployments?${decodeURI(`projectId=${projectId}&limit=1&state=READY,BUILDING,QUEUED`)}`, {
            headers:{
                'Authorization':'Bearer bI52fbqbefYKZ1kVnZpCESbF'
            }
        });
        const projects = await res.json();
        if(res.status === 200){
            return {
                state:projects.deployments[0].state as string,
                id:projects.deployments[0].uid as string
            };
        }
        throw projects;
    } catch(err){
        throw err;
    }
}

export const redeploy = async () => {
    try{
        let project = await getProject();
        let res = await fetch(`https://api.vercel.com/v13/deployments`, {
            method:'POST',
            headers:{
                'Authorization':`Bearer ${auth}`
            },
            body:JSON.stringify({
                deploymentId: project.id,
                meta: {
                  action: "redeploy"
                },
                name: "incodingplus-parents-guide",
                target: "production"
            })
        });
        let projects = await res.json();
        if(res.status !== 200){
            throw projects;
        }
        return projects;
    } catch(err){
        throw err;
    }
}
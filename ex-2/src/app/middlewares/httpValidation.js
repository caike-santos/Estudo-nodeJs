export function validarConteudo(req, res, next){
    if(["POST", "PUT", "PATCH"].includes(req.method)){
        const contentType = req.headers['content-type'];

        if(!contentType || !contentType.includes('application/json')){
            return res.status(415).json({
                type: "https://httpstatuses.com/415",
                title: "Unsupported Media Type",
                status: 415,
                detail: "O corpo da requisição deve ser enviado no formato application/json"
            });
        }
    }
    next();
}

export function verificarAccepts(req, res, next){
    const accepts = req.accepts('json');

    if(!accepts){
        return res.status(406).json({
            type: "https://httpstatuses.com/406",
            title: "Not Acceptable",
            status: 406,
            detail: "Esta API só suporta respostas no formato application/json"
        })
    }
    res.setHeader('content-type', 'application/json; charset=utf-8')
    next()
}

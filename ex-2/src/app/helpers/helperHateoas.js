export function gerarLinksUsuario(usuario, baseUrl = "/usuarios") {
  return {
    ...usuario,
    _links: [
      {
        rel: "self",
        href: `${baseUrl}/${usuario.id}`,
        method: "GET",
        description: "Obter detalhes deste usuário",
      },
      {
        rel: "update",
        href: `${baseUrl}/${usuario.id}`,
        method: "PATCH",
        description: "Atualizar dados deste usuário",
      },
      {
        rel: "delete",
        href: `${baseUrl}/${usuario.id}`,
        method: "DELETE",
        description: "Excluir este usuário",
      },
      {
        rel: "collection",
        href: `${baseUrl}`,
        method: "GET",
        description: "Listar todos os usuários",
      },
    ]
  };
}

export function gerarLinksPaginacao(baseUrl, page, limit, totalPages){
    const links = [{
        rel: "self",
        href: `${baseUrl}?page=${page}&limit=${limit}`,
        method: "GET"
    },
    {
        rel: "first",
        href: `${baseUrl}?page=1&limit=${limit}`,
        method: "GET"
    },
    {
        rel: "last",
        href: `${baseUrl}?page=${totalPages}&limit=${limit}`,
        method: "GET"
    }
];

    if(page > 1){
        links.push({
            rel: "prev",
            href: `${baseUrl}?page=${page-1}&limit=${limit}`
        })
    }
    if(page < totalPages){
        links.push({
            rel: "next",
            href: `${baseUrl}?page=${page+1}&limit=${limit}`
        })
    }

    return links
}

export function gerarLinksRoupa(roupa, baseUrl = "/roupas") {
  return {
    ...roupa,
    _links: [
      {
        rel: "self",
        href: `${baseUrl}/${roupa.id}`,
        method: "GET",
        description: "Obter detalhes desta roupa",
      },
      {
        rel: "update",
        href: `${baseUrl}/${roupa.id}`,
        method: "PATCH",
        description: "Atualizar dados desta roupa",
      },
      {
        rel: "delete",
        href: `${baseUrl}/${roupa.id}`,
        method: "DELETE",
        description: "Excluir este roupa",
      },
      {
        rel: "collection",
        href: `${baseUrl}`,
        method: "GET",
        description: "Listar todos as roupas",
      },
    ]
  };
}

import parser from 'query-string';

export function setUrlParams(params:[string,string][], basePath='/') {
  if (!Array.isArray(params) || params.length === 0)
    return

  const qs = parser.parse(window.location.search)

  params.forEach((param)=>{
    qs[param[0]] = param[1]
  });

  window.history.replaceState(null, '', `${basePath}?${parser.stringify(qs)}`)

}

export function removeUrlParams(params:string[], basePath='/') {
  if (!Array.isArray(params) || params.length === 0)
    return

  const qs = parser.parse(window.location.search)

  params.forEach((param)=>{
    delete qs[param];
  });
  const qs_str = parser.stringify(qs)
  window.history.replaceState(null, "", qs_str ? basePath+qs_str : basePath);

}

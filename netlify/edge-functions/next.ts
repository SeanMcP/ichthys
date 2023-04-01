const text = await Deno.readTextFile("./src/data/members.json");
const members: { id: string; name: string; url: string }[] = JSON.parse(text);

export default (request: Request) => {
  const referer = request.headers.get("referer");
  const refererURL = referer ? new URL(referer) : null;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  let nextIndex = 0;
  const memberIndex = members.findIndex((member) => {
    if (refererURL) {
      const memberURL = new URL(member.url);
      return refererURL.hostname === memberURL.hostname;
    }
    if (id) {
      return member.id === id;
    }
    return false;
  });

  if (memberIndex) {
    if (memberIndex < members.length - 1) {
      nextIndex = memberIndex + 1;
    }
  }

  const nextMember = members[nextIndex];
  return Response.redirect(nextMember.url);
};

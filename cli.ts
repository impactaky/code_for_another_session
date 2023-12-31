import $ from "https://deno.land/x/dax_extras@2.3.1/mod.ts";

$.setPrintCommand(true);

export async function runner(serverDir: string, serverName: string) {
  const script = await $`find ${serverDir} -name ${serverName} -print -quit`
    .text();
  if (script == "") {
    console.error("Server not found");
    Deno.exit(1);
  }

  const sockets = $.path(`/run/user/${Deno.uid()}`).expandGlob(
    "vscode-ipc-*.sock",
  );
  for await (const socket of sockets) {
    const result =
      await $`VSCODE_IPC_HOOK_CLI=${socket.path} ${script} ${Deno.args}`
        .noThrow().stderr("null");
    if (result.code == 0) Deno.exit(0);
  }
  console.error("Failed on all sockets");
  Deno.exit(1);
}

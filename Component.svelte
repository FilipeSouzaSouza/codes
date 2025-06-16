<script>
  let status = "";
  let file;
  export let endpoint;
  export let folder;

  async function handleUpload() {
    if (!file) {
      status = "Selecione um arquivo primeiro.";
      return;
    }

    try {
      // 1. Solicita a URL assinada
      const res = await fetch("https://budibase.mundiale.app/api/external/s3-presigned-upload/generateUploadUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          filename: file.name,
          folder: "uploads"
        })
      });

      const { url } = await res.json();

      // 2. Faz o upload
      const upload = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type
        },
        body: file
      });

      if (upload.ok) {
        status = "✅ Upload feito com sucesso!";
      } else {
        status = "❌ Erro ao fazer upload.";
      }
    } catch (err) {
      console.error(err);
      status = "⚠️ Erro no processo.";
    }
  }
</script>

<div>
  <input type="file" on:change="{e => file = e.target.files[0]}" />
  <button on:click="{handleUpload}">Upload</button>
  <p>{status}</p>
</div>

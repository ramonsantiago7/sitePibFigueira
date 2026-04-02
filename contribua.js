const pixBoxes = document.querySelectorAll(".pix-box");

const copyPixKey = async (pixKey) => {
  if (!pixKey) return false;

  try {
    await navigator.clipboard.writeText(pixKey);
    return true;
  } catch (error) {
    console.error("Não foi possível copiar a chave Pix automaticamente:", error);
    return false;
  }
};

pixBoxes.forEach((box) => {
  const copyButton = box.querySelector(".pix-copy-btn");
  const status = box.querySelector(".pix-copy-status");

  if (!copyButton || !status) return;

  copyButton.addEventListener("click", async () => {
    const pixKey = box.dataset.pixKey?.trim();
    const copied = await copyPixKey(pixKey);

    status.textContent = copied
      ? "Chave Pix copiada!"
      : "Não foi possível copiar. Atualize a chave Pix e tente novamente.";
  });
});
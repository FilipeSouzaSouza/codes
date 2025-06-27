<script>
  import { getContext } from "svelte";

  const { styleable, setOutput } = getContext("sdk");
  const component = getContext("component");

  export let fields = 1;
  export let maxFields;
  export let colorBackgroudHeader;
  export let colorTextHeader;
  export let colorBackgroudTable;
  export let fontSizeHeader;

  let values = Array.from({ length: fields }, () => ({ 
    inicio: "", 
    fim: "",
    fator: 0
  }));

  $: if (values.length !== fields) {
    values = Array.from(
      { length: fields },
      (_, i) => values[i] || { 
        inicio: "", 
        fim: "",
        fator: 0 
      }
    );
  }

  function validarFaixas() {
    return values.every(f =>
      f.inicio !== "" &&
      f.fim !== "" &&
      f.fator !== "" &&
      !isNaN(parseFloat(f.inicio)) &&
      !isNaN(parseFloat(f.fim)) &&
      !isNaN(parseFloat(f.fator))
    );
  }

  $: if (validarFaixas()) {
    setOutput("faixas", values);
  }
</script>

<div use:styleable={$component.styles} style="padding: 1rem; background: #fff;">
  <label style="font-weight: bold; margin-right: 0.5rem;">Total de faixas:</label>
  <input type="number" bind:value={fields} min="1" max="{maxFields}" style="width: 60px;" />

  <table style="border-collapse: collapse; width: 100%; margin-top: 1rem; font-size: {fontSizeHeader}px; table-layout: auto;">
    <thead style="background-color: {colorBackgroudHeader}; color: {colorTextHeader}">
      <tr>
        <th style="border: 1px solid #ccc; padding: 8px; white-space: nowrap;">Faixas</th>
        <th style="border: 1px solid #ccc; padding: 8px; white-space: nowrap;">Inicio</th>
        <th style="border: 1px solid #ccc; padding: 8px; white-space: nowrap;">Fim</th>
        <th style="border: 1px solid #ccc; padding: 8px; white-space: nowrap;">Fator</th>
      </tr>
    </thead>
    <tbody style="background-color: {colorBackgroudTable};">
      {#each Array(fields) as _, i}
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px;">{i + 1}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">
            <input type="number" bind:value={values[i].inicio} style="width: auto; min-width: 50px;" />
          </td>
          <td style="border: 1px solid #ccc; padding: 8px;">
            <input type="number" bind:value={values[i].fim} style="width: auto; min-width: 50px;" />
          </td>
          <td style="border: 1px solid #ccc; padding: 8px;">
            <input type="number" bind:value={values[i].fator} style="width: auto; min-width: 50px;" />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

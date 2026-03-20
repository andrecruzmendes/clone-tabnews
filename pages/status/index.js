import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (error) {
    return (
      <>
        <h1>Erro:</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );
  }

  if (isLoading) {
    return <h1>Carregando status...</h1>;
  }

  return (
    <>
      <h1>Status</h1>
      <table>
        {Object.keys(data).map((statusRowName) => (
          <StatusRow
            key={statusRowName}
            statusRowName={statusRowName}
            data={data[statusRowName]}
            depth={0}
          />
        ))}
      </table>
    </>
  );
}

function StatusRow(props) {
  const { statusRowName, data, depth } = props;
  if (typeof data === "object") {
    return (
      <>
        <tr>
          <td>
            <strong>
              <DepthSpacer depth={depth} />
              {toNatural(statusRowName)}
            </strong>
          </td>
          <td></td>
        </tr>

        {Object.keys(data).map((statusSubItemName) => (
          <>
            <StatusRow
              key={statusSubItemName}
              statusRowName={statusSubItemName}
              data={data[statusSubItemName]}
              depth={depth + 1}
            />
          </>
        ))}
      </>
    );
  }
  return (
    <tr>
      <td>
        <DepthSpacer depth={depth} />
        {toNatural(statusRowName)}
      </td>
      <td>
        {statusRowName.endsWith("_at")
          ? new Date(data).toLocaleString("pt-BR")
          : data}
      </td>
    </tr>
  );
}

function DepthSpacer(props) {
  const { depth } = props;
  if (depth) {
    return "└" + "─".repeat(Math.max(0, depth - 1));
  }
  return "";
}

function toNatural(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

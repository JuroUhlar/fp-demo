type JsonViewerProps = {
  data: any;
  data_test_id?: string;
} & React.HTMLAttributes<HTMLPreElement>;

export const JsonViewer = ({ data, ...props }: JsonViewerProps) => {
  return (
    <pre data-testid={props.data_test_id} {...props}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

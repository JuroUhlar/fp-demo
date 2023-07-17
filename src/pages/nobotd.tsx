import { FunctionComponent } from 'react';
import VisitorData from '../components/visitorData';

const Name: FunctionComponent = ({}) => {
  return (
    <main className="m-10">
      <div>
        <h1 className="text-3xl mb-4">Fingerprint Pro Demo</h1>
        <div>
          <VisitorData disableBotDetection={true} />
        </div>
      </div>
    </main>
  );
};

export default Name;

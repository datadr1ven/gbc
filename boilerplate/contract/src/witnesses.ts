import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WitnessContext } from '@midnight-ntwrk/compact-runtime';

// Get __dirname in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the only folder inside ./managed
const managedPath = path.join(__dirname, 'managed');
const [folder] = fs.readdirSync(managedPath).filter(f =>
  fs.statSync(path.join(managedPath, f)).isDirectory()
);

// Dynamically import the contract
const { Ledger } = await import(`./managed/${folder}/contract/index.cjs`);

export type CounterPrivateState = {
  readonly secretKey: Uint8Array;
  latestResult: Uint8Array;
};

export const createCounterPrivateState = (secretKey: Uint8Array, latestResult: Uint8Array) => ({
  secretKey,
  latestResult,
});

export const witnesses = {
  secretKey: ({ privateState }: WitnessContext<typeof Ledger, CounterPrivateState>): [CounterPrivateState, Uint8Array] => {
    return [privateState, privateState.secretKey];
  },
  latestResult: ({ privateState }: WitnessContext<typeof Ledger, CounterPrivateState>): [CounterPrivateState, Uint8Array] => {


    try {
      const fileContent: string = fs.readFileSync('hole_log.json', 'utf8');
      console.log('File Content:', fileContent);

      console.log('current state: ' + privateState.latestResult);
      privateState.latestResult[31] = 0;
      console.log('reset state: ' + privateState.latestResult);

      const cur_hole = JSON.parse(fileContent);
      if (cur_hole.putts < 3) {
        privateState.latestResult[31] += 1;
        console.log("2 putt or better :-)");
      } else {
        console.log("3 putt or worse :-(");
      }
      if (cur_hole.green < cur_hole.par) {
        privateState.latestResult[31] += 1;
        console.log("green in reg+1 :-)")
      } else {
        console.log("no green in reg (+1) :-(");
      }

      console.log('updated state: ' + privateState.latestResult);

    } catch (error) {
      console.error('Error reading file:', error);
    }

    return [privateState, privateState.latestResult];
  },
};

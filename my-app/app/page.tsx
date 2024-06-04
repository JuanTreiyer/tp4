import Counter from '../components/counter'
import {getCounterValue} from './actions'

export default async function Home() {
  const value = async () => {
    const res = await getCounterValue();
    return res;
  }
  const counterValue = await value();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <p key={counterValue?.id}>{counterValue?.value}</p> */}
      <Counter counter={counterValue}/>
    </main>
  );
}

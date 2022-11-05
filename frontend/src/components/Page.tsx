import { useState } from "react";
import { useLightning } from "../lightning/LightningStore";
import { Button, Input, Container, Step, Text, Row } from "./Page.styles";
import { CheckedBox, UncheckedBox } from "../resources";

const Page = () => {
  const lightningStore = useLightning();

  const [invoice, setInvoice] = useState('')
  const [peer, setPeer] = useState('');
  const [pubkey, setPubkey] = useState('');
  const [blocksMined, setBlocksMined] = useState(0);
  const [paid, setPaid] = useState(false);


  return (
        <Container>
          <Text size={'2'}>Steps</Text>

          <Step>
            <Row>
              {peer.length === 0 ? <UncheckedBox /> : <CheckedBox />}
              <Text>1. Add Bob as a peer</Text>
            </Row>
            <Button disabled={peer.length !== 0} onClick={() => lightningStore.addPeer('peer').then(x => setPeer(x)) }>Add peer</Button>
          </Step>

          <Step>
            <Row>
              {pubkey.length === 0 ? <UncheckedBox /> : <CheckedBox />}
              <Text>2. Open a channel to Bob</Text>
            </Row>
            <Button disabled={peer.length === 0 || pubkey.length !== 0} onClick={() => lightningStore.openChannel('pubkey', 10000).then(x => setPubkey(x)) }>Open channel</Button>
          </Step>

          <Step>
            <Row>
              {blocksMined < 6 ? <UncheckedBox /> : <CheckedBox />}
              <Text>3. Mine a block 6 times to confirm the channel</Text>
            </Row>
            <Row>
              <Button disabled={pubkey.length === 0 || blocksMined >= 6} onClick={() => lightningStore.mineBlock(6).then(x => setBlocksMined(blocksMined + 1)) }>Mine Block</Button>
              <Text>{blocksMined}</Text>
            </Row>
          </Step>

          <Step>
            <Row>
              {invoice.length === 0 ? <UncheckedBox /> : <CheckedBox />}
              <Text>4. Mine request an invoice from Bob.</Text>
            </Row>
            <Button disabled={blocksMined < 6 || invoice.length !== 0} onClick={() => lightningStore.generateInvoice(10000, 'memo').then(x => setInvoice(x)) }>Request Invoice</Button>
            <label>
              <Input name="invoice" disabled type="text" value={invoice || 'lnbc124324112341...'} />
            </label>
          </Step>

          <Step>
            <Text>5. Pay the requested invoice.</Text>
              <Row>
                {!paid ? <UncheckedBox /> : <CheckedBox />}
                <Button disabled={invoice.length === 0 || paid} onClick={() => lightningStore.generateInvoice(10000, 'memo').then(x => setPaid(true)) }>Pay Invoice</Button>
              </Row>
            <Input disabled={invoice.length > 0} type="text" value={invoice || 'lnbc124324112341...'} />
          </Step>
        </Container>

  )


};
export default Page;
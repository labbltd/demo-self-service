import {
    FormLabel,
    TextInput,
    Tile,
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
} from "@carbon/react"
import { useState } from "react";

interface Address {
    OrganisationName: string;
    BuildingNumber: number;
    AddressLine: string;
    Postcode: string;
    Town: string;
    pyGUID: string;
}

export default function AddressLookup() {
    const [model, setModel] = useState<any>(null);
    const [address, setAddress] = useState<Address | null>(null);

    async function search() {
        const searchResult = (await window.PCore.getDataApiUtils().getData<Address>('D_AddressesList', {})).data.data;
        if (searchResult) {
            const data = ['OrganisationName', 'BuildingNumber', 'AddressLine', 'Postcode', 'Town'];
            setModel({
                header: data,
                data: searchResult.map(item => [
                    item.OrganisationName,
                    item.BuildingNumber,
                    item.AddressLine,
                    item.Postcode,
                    item.Town
                ]),
                addresses: searchResult
            });
        }
    }
    return <>
        {!model && !address && <TextInput id="zipcode" type="text" labelText="Zipcode" onChange={() => null} onBlur={e => e.target.value && search()} />}
        {model && !address &&
            <Table>
                <TableHead>
                    <TableRow>
                        {model.header.map((header: any) => (
                            <TableHeader key={header}>{header}</TableHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {model.data.map((row: any, idx: number) => (
                        <TableRow key={idx} onClick={() => setAddress(model.addresses[idx])}>
                            {row.map((cell: any) => (
                                <TableCell key={cell}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        }
        {address && <Tile>
            {address.OrganisationName} {address.BuildingNumber} {address.AddressLine} {address.Postcode} {address.Town}
        </Tile>}
    </>
}
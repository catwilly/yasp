

export interface IYaspItem {
    Name: string;
    Quantity: number;
    Checked: boolean;
}

export interface IYaspList {
    Name: string;
    Items: IYaspItem[];
}

export interface  IYaspRepo {
    Lists: IYaspList[];
}

export class Mockery {

    public static GetItem(i: number) : IYaspItem {
        return {
            Name: 'item ' + i,
            Quantity: Math.round(Math.random() * 10),
            Checked: false
        };
    }

    public static GetList(name: string, itemCount: number) : IYaspList {
        const items: IYaspItem[] = new Array(itemCount);
        for(let i=0 ; i<itemCount; i++) {
            items[i] = this.GetItem(i);
        }
        return {
            Name: name,
            Items: items
        };
    }
}

export class YaspConverter {

    public static ListToString(list: IYaspList) : string {
        let listStr = `${list.Name}`;
        
        for(let i=0; i<list.Items.length; i++) {
            let item = list.Items[i];
            let name = item.Name;
            listStr += `|${item.Quantity}|${name}`;
        }

        listStr = listStr.replace(/ /g, "_");

        return listStr;
    }

    public static StringToList(str: string) : IYaspList {
        let parts = str.split("|");
        let name = parts[0].replace(/_/g, " ");;

        let items: IYaspItem[] = []
        for(let i=1; i<parts.length; i+=2) {
            let qStr = parts[i];
            let name = parts[i+1].replace(/_/g, " ");
            
            let q = parseInt(qStr);
            let yaspItem = { Name: name, Quantity: q, Checked: false };
            
            items.push(yaspItem);
        }

        let yaspList = { Name: name, Items: items };

        return yaspList;
    }

}
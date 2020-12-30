import { window, StatusBarItem, StatusBarAlignment } from 'vscode';
import { get } from './request';

const getFundIndexs = async () => {
    const results = await get<{
        data: {
            total: number;
            diff: {
                f2: number;
                f3: number;
                f4: number;
                f12: string;
                f14: string;
            }[];
        },
    }>('https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&fields=f2,f3,f4,f12,f14&secids=1.000001,1.000300,0.399001,0.399006&_=1597632105416');
    const cbList = results.data.diff.map((x: { f14: string; f3: number; }) => {
        const cb = {
            title: `${x.f14.substring(0, 2)}`,
            description: `${x.f3}`,
            icon: x.f3 >= 0 ? `$(arrow-up)` : `$(arrow-down)`,
        };
        return cb;
    });
    return cbList;
};

export class FundIndex {
    // 定义一个状态栏的属性
    private statusBar: StatusBarItem | undefined;

    public async updateIndex() {
        if (!this.statusBar) {
            this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        const cbList = await getFundIndexs();
        let text = '';
        cbList.forEach((item) => {
            text += `${item.title} ${item.icon}${item.description}     `;
        });
        this.statusBar.text = text;
        this.statusBar.show();
    }

    dispose() {
        this.statusBar?.hide();
        this.statusBar?.dispose();
    }

}

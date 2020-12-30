import * as vscode from 'vscode';
import { FundIndex } from './fundIndex';

export function activate(context: vscode.ExtensionContext) {
	let timer: any = null;
	let fundIndex: FundIndex;

	let disposable = vscode.commands.registerCommand('fund.showIndex', () => {
		fundIndex = new FundIndex();
		const timer = () => {
			setTimeout(() => {
				fundIndex.updateIndex();
				timer();
			}, 5000);
		};
		timer();
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(vscode.commands.registerCommand('fund.closeIndex', () => {
		clearTimeout(timer);
		fundIndex.dispose();
	}));

}

export function deactivate() {}

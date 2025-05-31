import { spawn } from 'child_process';
import watch from 'node-watch';

const folder = './applications';
// const commandFn = file => ['npm', ['run', 'build:development']];
const commandFn = file => ['npx', ['nx', 'run', `${file.split('/')[1]}:build`, '--configuration=development']];
watch(folder, { recursive: true }, function (evt, file) {
    if (!file.includes('vite.config.mts')) {
        console.log('%s changed.', file);
        const command = commandFn(file);
        const child = spawn(command[0], command[1]);

        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);

        child.on('close', (code) => {
            console.log(code ? '❌' : '✅')
        });
    }
});

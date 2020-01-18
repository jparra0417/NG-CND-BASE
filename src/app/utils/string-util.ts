export class StringUtil {

    static replaceText(text: string, args?: any) {
        if (args && text)
            for (const variable in args)
                text = text.replace(new RegExp("{" + variable + "}", 'g'), args[variable]);
        return text;
    }
}

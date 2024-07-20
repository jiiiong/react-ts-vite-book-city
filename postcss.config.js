import pxtorem from 'postcss-pxtorem'
import presetEnv from 'postcss-preset-env'
export default  {
    plugins: [
        pxtorem ({
            rootValue: 37.5, 
            propList: ['*'], 
            selectorBlackList: ['html']
        }),
        presetEnv()
    ]
};
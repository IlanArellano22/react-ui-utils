import { __assign, __awaiter, __generator } from "tslib";
import { isPromiseLike } from "common";
function syncCacheCall(cache, func, args) {
    var _a, _b;
    var entry = cache.entries.find(function (entry) { return entry.args === args; });
    var value = entry ? entry.value.payload : func.apply(void 0, args);
    var cached = !!entry;
    var async = entry ? entry.value.async : isPromiseLike(value);
    var newEntry = cached
        ? undefined
        : {
            args: args,
            value: {
                async: async,
                payload: value
            },
            id: ((_b = (_a = cache.entries[cache.entries.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0) + 1
        };
    //El valor se encontró en el caché:
    return {
        result: value,
        newEntry: newEntry,
        async: async
    };
}
export function cacheCall(cache, config, dispatch, func, args, onCall) {
    var _this = this;
    //Leer el cache
    var result = syncCacheCall(cache, func, args);
    //La entrada que se va a agregar al cache:
    var newEntry = result.newEntry;
    if (newEntry) {
        dispatch({
            type: "setEntry",
            payload: {
                entry: newEntry,
                config: config
            }
        });
        if (isPromiseLike(result.result)) {
            //Agrega la entrada al cache, note que no devolvemos la promesa resultante de la función,
            //si no que agregamos la promesa generada por 'ret':
            //Ruta asincrona para verificar que la promesa no devuelva una excepción:
            var ret = (function () { return __awaiter(_this, void 0, void 0, function () {
                var syncValue, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, result.result];
                        case 1:
                            syncValue = (_a.sent());
                            //Establecer el cache con el valor síncrono
                            //NOTA: Es posible que en este punto la entrada del cache ya no exista, ya que existe un "await" entre el "setEntry" y el "resolvePromise",
                            //en ese inter se pudo haber llenado el cache y borrado ese elemento, en este caso el reduce ignora el resolvePromise ya que el resolvePromise funciona
                            //por "id", no por "args"
                            dispatch({
                                type: "resolvePromise",
                                payload: {
                                    id: newEntry.id,
                                    value: syncValue
                                }
                            });
                            return [2 /*return*/, syncValue];
                        case 2:
                            error_1 = _a.sent();
                            //La promesa lanzó error, limpiamos el caché:
                            dispatch({
                                type: "error",
                                payload: { error: error_1 }
                            });
                            throw error_1;
                        case 3:
                            if (result.newEntry) {
                                //Llamamos al onCall hasta que ya se resolvió la promesa
                                if (onCall)
                                    onCall();
                            }
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            }); })();
            //Modificamos la entrada que se va a agregar al cache con la promesa ret:
            //Es decir, no se develve la promesa tal cual que devolvió la función
            newEntry = __assign(__assign({}, newEntry), { value: {
                    async: true,
                    payload: ret
                } });
        }
        else {
            //Llamamos al onCall justo después de llamar a la función sólo si el resultado es síncrono, si no, el onCall se llama hasta que se resuelve la promesa
            if (onCall)
                onCall();
        }
    }
    //Agrega la entrada al cache:
    if (newEntry) {
        //Devolver el valor en el cache:
        return newEntry.value.payload;
    }
    if (result.async && !isPromiseLike(result.result)) {
        //Si la función originalmente fue asíncrona pero el resultado en el cache no es una promesa
        //Esto significa que la promesa ya se resolvió y que esta almacenado el valor síncrono en el cache
        //Se devuelve una promesa resulta inmediatamente
        return result.result;
    }
    return result.result;
}
//# sourceMappingURL=func.js.map
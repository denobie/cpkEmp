import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import {useContext, useState} from "react";
import {CarrinhoContext} from "../../contexts/CarrinhoContext";
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';

export function CardPaymentMethod({ onPaymentMethod, onPaymentAmount }) {
    const [formaPagamento, setFormaPagamento] = useState('a');
    const [qtdeParcelas, setQtdeParcelas] = useState(1);
    const { cartTotal } = useContext(CarrinhoContext);

    const handlePaymentMethod = (event) => {
        const paymentMethod = event.target.value;

        setFormaPagamento(paymentMethod);

        if (onPaymentMethod) {
            onPaymentMethod(paymentMethod);
        }
    }

    const handlePaymentAmount = (event) => {
        let paymentAmount = event.target.value;

        if (formaPagamento !== 'c'){
            paymentAmount = 0
        }

        setQtdeParcelas(paymentAmount);

        if (onPaymentAmount) {
            onPaymentAmount(paymentAmount);
        }
    }

    return (
        <Card sx={{ minWidth: 275, backgroundColor: "#ede4f2", border: "1px solid lightgray", borderRadius: "7px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <CardContent>
                <Typography variant="h5" component="div" mb={1}>
                    Valor Total: R$ {cartTotal.toFixed(2)}
                </Typography>
                <Typography variant="h5" component="div">
                    Forma de Pagamento
                </Typography>
                <FormControl>
                        <RadioGroup
                            row
                            defaultValue="a"
                            value={formaPagamento}
                            onChange={handlePaymentMethod}
                        >
                            <FormControlLabel value="a" control={<Radio />} label="Boleto (à vista)" />
                            <FormControlLabel value="c" control={<Radio />} label="Cartão de Crédito" />
                            <FormControlLabel value="d" control={<Radio />} label="Cartão de Débito" />
                            <FormControlLabel value="p" control={<Radio />} label="Pix" />
                    </RadioGroup>
                </FormControl>
                {(formaPagamento === 'c' || formaPagamento === 'd') && (
                <Box id="box-cartao" display="flex" flexDirection="column" alignItems="center" maxWidth="600px"
                     margin="auto" mt={1} visibility="visible">
                    <Box  mb={1}>
                        <TextField id={"nomeCartao"} name="nomeCartao" type="text" label="Nome no Cartão" variant="outlined" size="small"
                                   sx={{ width: '300px' }}
                        />
                    </Box>
                    <Box mb={1}>
                        <TextField id={"numeroCartao"} name="numeroCartao" type="text" label="Número do Cartão" variant="outlined" size="small"
                                   sx={{ width: '300px' }}
                        />
                    </Box>
                    <Box mb={1} fleDirection="column">
                        <FormControl sx={{minWidth: 120, mr: 7.5 }}>
                            <InputLabel id="label-mes">Mês</InputLabel>
                            <Select labelId="label-mes" label="Mês">
                                <MenuItem value={1}>01</MenuItem>
                                <MenuItem value={2}>02</MenuItem>
                                <MenuItem value={3}>03</MenuItem>
                                <MenuItem value={4}>04</MenuItem>
                                <MenuItem value={5}>05</MenuItem>
                                <MenuItem value={6}>06</MenuItem>
                                <MenuItem value={7}>07</MenuItem>
                                <MenuItem value={8}>08</MenuItem>
                                <MenuItem value={9}>09</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="label-ano">Ano</InputLabel>
                            <Select labelId="label-ano" label="Ano">
                                <MenuItem value={2024}>2024</MenuItem>
                                <MenuItem value={2025}>2025</MenuItem>
                                <MenuItem value={2026}>2026</MenuItem>
                                <MenuItem value={2027}>2027</MenuItem>
                                <MenuItem value={2028}>2028</MenuItem>
                                <MenuItem value={2029}>2029</MenuItem>
                                <MenuItem value={2030}>2030</MenuItem>
                                <MenuItem value={2031}>2031</MenuItem>
                                <MenuItem value={2033}>2033</MenuItem>
                                <MenuItem value={2034}>2034</MenuItem>
                                <MenuItem value={2035}>2035</MenuItem>
                                <MenuItem value={2036}>2036</MenuItem>
                                <MenuItem value={2037}>2037</MenuItem>
                                <MenuItem value={2038}>2038</MenuItem>
                                <MenuItem value={2039}>2039</MenuItem>
                                <MenuItem value={2040}>2040</MenuItem>
                                <MenuItem value={2041}>2041</MenuItem>
                                <MenuItem value={2042}>2042</MenuItem>
                                <MenuItem value={2043}>2043</MenuItem>
                                <MenuItem value={2044}>2044</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mb={1}>
                        <TextField id={"cvv"} name="cvv" type="text" label="CVV" variant="outlined" size="small"
                                   sx={{ width: '300px' }}
                        />
                    </Box>
                    {(formaPagamento === 'c') &&
                    <Box mb={1} sx={{ minWidth: 300 }}>
                        <FormControl fullWidth>
                            <InputLabel id="label-parcelas">Número de Parcelas</InputLabel>
                            <Select labelId="label-parcelas" label="Número de Parcelas"
                                    onChange={handlePaymentAmount}
                                    value={qtdeParcelas}
                            >
                                <MenuItem value={1}>1x sem Juros</MenuItem>
                                <MenuItem value={2}>2x sem Juros</MenuItem>
                                <MenuItem value={3}>3x sem Juros</MenuItem>
                                <MenuItem value={4}>4x sem Juros</MenuItem>
                                <MenuItem value={5}>5x sem Juros</MenuItem>
                                <MenuItem value={6}>6x sem Juros</MenuItem>
                                <MenuItem value={7}>7x sem Juros</MenuItem>
                                <MenuItem value={8}>8x sem Juros</MenuItem>
                                <MenuItem value={9}>9x sem Juros</MenuItem>
                                <MenuItem value={10}>10x sem Juros</MenuItem>
                                <MenuItem value={11}>11x com Juros</MenuItem>
                                <MenuItem value={12}>12x com Juros</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    }
                </Box>)}
            </CardContent>
        </Card>
    )
}

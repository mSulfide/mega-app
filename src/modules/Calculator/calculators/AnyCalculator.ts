import ComplexCalculator from "./ComplexCalculator";
import MatrixCalculator from "./MatrixCalculator";
import PolynomialCalculator from "./PolynomialCalculator";
import RealCalculator from "./RealCalculator";
import VectorCalculator from "./VectorCalculator";

type AnyCalculator = RealCalculator | ComplexCalculator | VectorCalculator | MatrixCalculator | PolynomialCalculator;

export default AnyCalculator;
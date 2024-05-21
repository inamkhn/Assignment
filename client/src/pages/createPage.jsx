import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";

const CreatePage = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
  });
  const [numberOfColors, setNumberOfColors] = useState(0);
  const [colors, setColors] = useState([]);
  const [tonesAndShades, setTonesAndShades] = useState({});
  const queryClient = useQueryClient();

  const handleNumberOfColorsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumberOfColors(num);
    setColors(Array(num).fill(""));
    setTonesAndShades({});
  };

  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const addToneAndShadeRow = (colorIndex) => {
    const newTonesAndShades = { ...tonesAndShades };
    if (!newTonesAndShades[colorIndex]) {
      newTonesAndShades[colorIndex] = [];
    }
    newTonesAndShades[colorIndex].push({ tone: "", shade: "" });
    setTonesAndShades(newTonesAndShades);
  };

  const handleToneAndShadeChange = (colorIndex, toneShadeIndex, key, value) => {
    const newTonesAndShades = { ...tonesAndShades };
    newTonesAndShades[colorIndex][toneShadeIndex][key] = value;
    setTonesAndShades(newTonesAndShades);
  };

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ productData }) => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/createproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productData }),
        });

        // const data = await res.json();
        if (!res.ok) throw new Error(res.error || "Failed to create form");
        console.log(res);
        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Form created successfully");
    },
  });

  const handleProductDetailsChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const colorsData = colors.map((color, index) => ({
      color,
      tones: tonesAndShades[index] || [],
    }));

    const productData = {
      ...productDetails,
      colors: colorsData,
    };
    console.log(productData);

    mutate(productData);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // axios.post("http://localhost:5000/api/v1/createproduct", productData, config).then((response) => {
    //   console.log(response.data);
    //   toast("Success!");
    // });
  };

  return (
    <div>
      <Toaster />
      <div className="max-w-sm mx-auto ">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[500px]"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              placeholder="name"
              value={productDetails.name}
              onChange={handleProductDetailsChange}
            />
          </div>
          <div className="mb-6">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              name="description"
              placeholder="description"
              value={productDetails.description}
              onChange={handleProductDetailsChange}
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="number"
              type="number"
              placeholder="Number of Colors"
              value={numberOfColors}
              onChange={handleNumberOfColorsChange}
              min="0"
            />
          </div>

          <div className="flex space-x-1">
            {colors.map((color, colorIndex) => (
              <div key={colorIndex}>
                <div className="mb-6">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder={`Color ${colorIndex + 1}`}
                    value={color}
                    onChange={(e) =>
                      handleColorChange(colorIndex, e.target.value)
                    }
                  />
                </div>
                {tonesAndShades[colorIndex] &&
                  tonesAndShades[colorIndex].map(
                    (toneShade, toneShadeIndex) => (
                      <div key={toneShadeIndex}>
                        <div className="mb-6">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Tone"
                            value={toneShade.tone}
                            onChange={(e) =>
                              handleToneAndShadeChange(
                                colorIndex,
                                toneShadeIndex,
                                "tone",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="mb-6">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Shade"
                            value={toneShade.shade}
                            onChange={(e) =>
                              handleToneAndShadeChange(
                                colorIndex,
                                toneShadeIndex,
                                "shade",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    )
                  )}
                <button
                className="bg-green-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => addToneAndShadeRow(colorIndex)}
                >
                  Add Tone and Shade
                </button>
              </div>
            ))}
          </div>
        </form>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

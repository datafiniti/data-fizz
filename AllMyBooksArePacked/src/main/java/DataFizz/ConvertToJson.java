package DataFizz;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ConvertToJson {

    ObjectMapper mapper;

    public ConvertToJson()
    {
        mapper = new ObjectMapper();
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }

    public  String ConvertToJsonString(Object o) throws JsonProcessingException {
       return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(o);
    }
}
